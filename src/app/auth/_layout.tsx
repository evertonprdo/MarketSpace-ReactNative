import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sing-in" />
      <Stack.Screen name="sing-up" />
    </Stack>
  )
}