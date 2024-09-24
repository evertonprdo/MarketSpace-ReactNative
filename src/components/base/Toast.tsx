import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type Props = {
  message: string
} & ViewProps

export function Toast({ message, style }: Props) {
  return (
    <View style={[styles.container, style]}>

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    pointerEvents: 'none'
  },

  text: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[700],
  }
})