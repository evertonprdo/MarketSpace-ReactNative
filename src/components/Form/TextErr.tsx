import { StyleSheet, Text, TextProps } from "react-native";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

export function TextErr({ style, children, ...props }: TextProps) {
  return (
    <Text
      style={[styles.text, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: 10,
    color: Colors.redLight
  }
})