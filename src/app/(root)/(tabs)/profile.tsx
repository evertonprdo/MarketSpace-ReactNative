import { Pressable, Text, View } from "react-native";
import { useSession } from "@/contexts/AuthContext";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";

export default function Profile() {
  const { signOut } = useSession()

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>

      <Text
        onPress={() => {
          router.navigate("/auth/sing-in")
          signOut()
        }}
      >
        Sair
      </Text>
    </View>
  )
}