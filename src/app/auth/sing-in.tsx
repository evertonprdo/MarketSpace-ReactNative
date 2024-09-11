import { router } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "@/contexts/AuthContext";

export default function SingIn() {
  const { signIn } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.navigate("/auth/sing-up")
      }}>
        Sing Up
      </Text>

      <Text onPress={() => signIn()}>
        Sing In
      </Text>
    </View>
  )
}