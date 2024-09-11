import { Redirect, Stack } from "expo-router";

import { useSession } from "@/contexts/AuthContext";


export default function RootLayout() {
  const { session } = useSession()

  if (!session) return <Redirect href={"/auth/sing-in"} />

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="[product-id]" />
      <Stack.Screen name="user-ad/create" />
      <Stack.Screen name="user-ad/edit" />
      <Stack.Screen name="user-ad/[id]" />
    </Stack>
  )
}