import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

import Check from "@/assets/icons/Check";
import Square from "@/assets/icons/Square";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";
import Circle from "@/assets/icons/Circle";
import RadioButton from "@/assets/icons/RadioButton";

type Props = PressableProps & {
  label: string
  variant: "radio" | "checkbox"
  value?: boolean
}

export function Checkable({ label, value, variant, ...props }: Props) {
  const Icon = variant === "checkbox"
    ? { Active: Check, NotActive: Square }
    : { Active: RadioButton, NotActive: Circle }

  const size = 18

  return (
    <Pressable
      style={styles.container}
      hitSlop={8}
      {...props}
    >
      {value
        ? <Icon.Active width={size} height={size} fill={Colors.blueLight} style={styles.select} />
        : <Icon.NotActive width={size} height={size} fill={Colors.gray[400]} style={styles.select} />
      }

      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 8
  },

  select: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.gray[400],
    borderRadius: 4
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[200]
  }
})