import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { v4 as uuidv4 } from "uuid";

import { CaptureControls } from "../src/components/CaptureControls";
import { computeCalibration } from "../src/lib/calibration";
import { extractLaserStripe } from "../src/lib/laserStripe";
import { estimateOuterDiameter, estimatePitch } from "../src/lib/pitch";
import { findMatches } from "../src/lib/matching";
import { saveScan } from "../src/lib/storage";
import { getBundledModel, runMockInference } from "../src/lib/inference";

const DEFAULT_CALIBRATION = {
  pxPerMM: 7.92,
  focalPx: 1234,
  timestamp: new Date().toISOString()
};

export default function ScanScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [laserMode, setLaserMode] = useState(true);
  const [calibration, setCalibration] = useState(DEFAULT_CALIBRATION);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    const bundled = getBundledModel();
    setStatus(`Model ${bundled.manifest.version} ready`);
  }, []);

  const handleCalibrate = () => {
    const next = computeCalibration({
      checkerboardCellMM: 5,
      horizontalCells: 8,
      verticalCells: 6,
      pixelWidth: 1920,
      pixelHeight: 1080
    });
    setCalibration(next);
    Alert.alert("Calibration", "Calibration updated with latest sample.");
  };

  const handleCapture = async () => {
    if (!permission?.granted) {
      await requestPermission();
      return;
    }

    setStatus("Capturing frame...");
    const photo = await cameraRef.current?.takePictureAsync({
      skipProcessing: true
    });

    if (!photo?.uri) {
      Alert.alert("Capture failed", "Could not access camera frame.");
      setStatus("Capture failed");
      return;
    }

    const stripe = await extractLaserStripe(photo.uri, {
      color: laserMode ? "red" : "green"
    });
    const pitch = estimatePitch(stripe, calibration);
    const diameter = estimateOuterDiameter(stripe, calibration);
    const matches = findMatches(pitch.pitchMm, diameter.odMm);
    const inference = runMockInference();

    const scanId = uuidv4();
    await saveScan({
      scanId,
      file: photo.uri,
      label: {
        family: matches[0]?.family ?? "Unknown",
        brand: matches[0]?.brand ?? "Unknown",
        pitch_mm: pitch.pitchMm,
        od_mm: diameter.odMm
      },
      calibration,
      timestamp: new Date().toISOString(),
      pitchTpi: pitch.pitchTpi,
      odMm: diameter.odMm
    });

    setStatus("Scan stored");

    router.push({
      pathname: "/results",
      params: {
        payload: JSON.stringify({
          scanId,
          uri: photo.uri,
          pitch,
          diameter,
          matches,
          inference
        })
      }
    });
  };

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>Camera permission is required.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preview}>
        <CameraView
          style={StyleSheet.absoluteFill}
          ref={(camera) => {
            cameraRef.current = camera;
          }}
          ratio="16:9"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            Calibration: {calibration.pxPerMM.toFixed(2)} px/mm
          </Text>
          <Text style={styles.overlayText}>{status}</Text>
        </View>
      </View>
      <CaptureControls
        onCapture={handleCapture}
        onCalibrate={handleCalibrate}
        laserMode={laserMode}
        toggleLaser={() => setLaserMode((value) => !value)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  preview: {
    flex: 1,
    borderRadius: 16,
    margin: 16,
    overflow: "hidden"
  },
  overlay: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    padding: 12,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: 10
  },
  overlayText: {
    color: "#f8fafc",
    fontSize: 14,
    fontWeight: "600"
  },
  text: {
    color: "#f8fafc"
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617"
  }
});
