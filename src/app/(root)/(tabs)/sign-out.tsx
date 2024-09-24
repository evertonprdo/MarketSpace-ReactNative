import { Image, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/base/Button";

import type { UserDTO } from "@/dtos/userDTO";
import { useAuth } from "@/hooks/useAuth";
import { fmtValueToImageUriRequest } from "@/utils/dataTransform";
import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

export default function SignOut() {
  const { signOut } = useAuth()
  const user = useAuth().user as UserDTO

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: fmtValueToImageUriRequest(user.avatar) }}
        style={styles.image}
      />

      <Text style={styles.text}>{user.name}</Text>

      <Button
        title="Deslogar"
        variant="black"
        onPress={signOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 32,
    padding: 48
  },
  image: {
    alignSelf: 'center',

    width: 168,
    height: 168,

    borderRadius: 999,
    borderWidth: 3,
    borderColor: Colors.blueLight
  },

  text: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xxl,
    color: Colors.gray[100],
    textAlign: 'center'
  }
})