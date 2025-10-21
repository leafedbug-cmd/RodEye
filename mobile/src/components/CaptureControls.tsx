import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onCapture(): void;
  onCalibrate(): void;
  laserMode: boolean;
  toggleLaser(): void;
}

export function CaptureControls({
  onCapture,
  onCalibrate,
  laserMode,
  toggleLaser
}: Props) {
  return (
    <View style={styles.container}>
      <CaptureButton label="Calibrate" onPress={onCalibrate} />
      <CaptureButton
        label={laserMode ? "Laser On" : "Laser Off"}
        onPress={toggleLaser}
        variant={laserMode ? "primary" : "ghost"}
      />
      <CaptureButton label="Capture" onPress={onCapture} />
    </View>
  );
}

interface CaptureButtonProps {
  label: string;
  onPress(): void;
  variant?: "primary" | "ghost";
}

function CaptureButton({
  label,
  onPress,
  variant = "primary"
}: CaptureButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === "ghost" ? styles.buttonGhost : styles.buttonPrimary
      ]}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f8fafc",
    marginHorizontal: 4
  },
  buttonPrimary: {
    backgroundColor: "#0ea5e9"
  },
  buttonGhost: {
    backgroundColor: "transparent"
  },
  buttonLabel: {
    color: "#f8fafc",
    fontWeight: "600"
  }
});
