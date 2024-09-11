import { useSession } from "@/contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SingIn() {
  const { signIn } = useSession()

  const { redirectUrl } = useLocalSearchParams()
  console.log("Redi =>", redirectUrl)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.navigate("/auth/sing-up")
      }}>
        Sing Up
      </Text>

      <Text onPress={() => {

        signIn()

        if (redirectUrl) {
          router.replace(redirectUrl as any)
          return
        }
        router.replace("/")
      }}>
        Sing In
      </Text>
    </View>
  )
}