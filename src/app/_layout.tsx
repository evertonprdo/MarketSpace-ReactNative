import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";

import Colors from "@/constants/Color";

import { Loading } from "@/components/base/Loading";

import { AuthContextProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function AppLayout() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  if (!fontsLoaded) return <Loading />

  return (
    <SafeAreaProvider>
      <AuthContextProvider>

        <View style={styles.container}>
          <StatusBar
            style="dark"
            backgroundColor="transparent"
            translucent
          />
          <ToastProvider>
            <Slot />
          </ToastProvider>
        </View>

      </AuthContextProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[600]
  }
})