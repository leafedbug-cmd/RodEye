import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "#f8fafc",
        contentStyle: { backgroundColor: "#020617" }
      }}
    >
      <Stack.Screen name="scan" options={{ title: "RodEye Scanner" }} />
      <Stack.Screen name="results" options={{ title: "Scan Results" }} />
    </Stack>
  );
}
