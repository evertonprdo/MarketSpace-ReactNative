import { Pressable, Text, View } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function Profile() {
  const { signOut } = useSession()

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Pressable>
        <Text onPress={signOut}>Sing Out</Text>
      </Pressable>
    </View>
  )
}