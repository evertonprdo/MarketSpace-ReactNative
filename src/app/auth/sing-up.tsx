import { useSession } from "@/contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SingUp() {
  const { signIn } = useSession()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => {
        router.back()
      }}>
        Back Sing In
      </Text>
    </View>
  )
}