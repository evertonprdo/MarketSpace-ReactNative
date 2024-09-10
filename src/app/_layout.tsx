import { Slot } from "expo-router";
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla"

export default function () {
  const [ fontsLoaded ] = useFonts({ Karla_400Regular, Karla_700Bold })

  if(!fontsLoaded) return null
  
  return <Slot />
}