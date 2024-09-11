import { Slot, Stack } from "expo-router";
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla"
import { SessionProvider } from "@/contexts/AuthContext";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) return null

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}