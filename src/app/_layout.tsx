import { SessionProvider } from "@/contexts/AuthContext";
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";
import { Slot } from "expo-router";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) return null

  return (
    <SessionProvider>
      <Slot/>
    </SessionProvider>
  )
}