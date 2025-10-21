import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

interface Payload {
  scanId: string;
  uri: string;
  pitch: {
    pitchMm: number;
    pitchTpi: number;
    crestCount: number;
    uncertainty: number;
  };
  diameter: {
    odMm: number;
    odPx: number;
  };
  matches: Array<{
    id: string;
    family: string;
    brand: string;
    pitch_mm: number;
    pitch_tpi: number;
    od_mm: number;
    score: number;
  }>;
  inference: Array<{
    label: string;
    confidence: number;
  }>;
}

export default function ResultsScreen() {
  const params = useLocalSearchParams();
  const payload = useMemo<Payload | null>(() => {
    if (!params.payload || typeof params.payload !== "string") {
      return null;
    }
    try {
      return JSON.parse(params.payload) as Payload;
    } catch (error) {
      console.warn("Failed to parse payload", error);
      return null;
    }
  }, [params.payload]);

  if (!payload) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>No results available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Scan {payload.scanId}</Text>
        <Image source={{ uri: payload.uri }} style={styles.image} />
        <View style={styles.card}>
          <Text style={styles.heading}>Measurements</Text>
          <Text style={styles.text}>
            Pitch: {payload.pitch.pitchMm.toFixed(3)} mm (
            {payload.pitch.pitchTpi.toFixed(2)} TPI)
          </Text>
          <Text style={styles.text}>
            Outer Diameter: {payload.diameter.odMm.toFixed(1)} mm
          </Text>
          <Text style={styles.text}>
            Crest count: {payload.pitch.crestCount}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Matches</Text>
          {payload.matches.map((match) => (
            <View key={match.id} style={styles.matchRow}>
              <Text style={styles.text}>{match.family}</Text>
              <Text style={styles.smallText}>
                {match.brand} • {match.pitch_mm.toFixed(3)} mm •{" "}
                {match.od_mm.toFixed(1)} mm • Score{" "}
                {(match.score * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Model Confidence</Text>
          {payload.inference.map((item) => (
            <View key={item.label} style={styles.matchRow}>
              <Text style={styles.text}>{item.label}</Text>
              <Text style={styles.smallText}>
                {(item.confidence * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  scrollContent: {
    padding: 16,
    gap: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc"
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: "#1e293b"
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 16
  },
  heading: {
    fontSize: 16,
    color: "#38bdf8",
    fontWeight: "600",
    marginBottom: 8
  },
  text: {
    color: "#f8fafc",
    fontSize: 14
  },
  smallText: {
    color: "#cbd5f5",
    fontSize: 12
  },
  matchRow: {
    marginBottom: 8
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617"
  }
});
