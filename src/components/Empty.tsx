import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";
import { StyleSheet, Text, View } from "react-native";

import SmileyMeh from "@/assets/icons/SmileyMeh";

export function EmptyComponent() {
  return (
    <View style={styles.container}>
      <SmileyMeh height={64} width={64} style={styles.selfCenter} />

      <Text style={styles.title}>
        Ops!
      </Text>

      <Text style={styles.text}>
        Parece que não encontramos nenhum produto, que tal cadastrar algum?
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16
  },
  selfCenter: { alignSelf: 'center' },
  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[200],
    textAlign: 'center'
  },
  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[200],
    textAlign: 'center'
  }
})