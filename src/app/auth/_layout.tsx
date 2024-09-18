import Colors from "@/constants/Color";
import { router, Stack } from "expo-router";

export default function AuthLayout() {

  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: Colors.gray[600] }
    }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}