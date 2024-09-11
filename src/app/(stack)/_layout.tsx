import { useSession } from "@/contexts/AuthContext";
import { Redirect, Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const { session } = useSession()

  const pathname = usePathname()

  if (!session) {
    return <Redirect href={{ pathname: "/auth/sing-in", params: { redirectUrl: pathname } }} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="user/create-ad" />
      <Stack.Screen name="user/edit-ad" />
      <Stack.Screen name="user/[productId]" />
      <Stack.Screen name="[productId]" />
    </Stack>
  )
}