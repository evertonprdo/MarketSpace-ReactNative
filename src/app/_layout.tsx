import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";

import Colors from "@/constants/Color";

import { SessionProvider } from "@/contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <SessionProvider>

        <View style={styles.container}>
          <StatusBar
            style="dark"
            backgroundColor="transparent"
            translucent
          />
          <Slot />
        </View>

      </SessionProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[600]
  }
})