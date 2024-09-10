import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import Check from "@/assets/icons/Check";
import Square from "@/assets/icons/Square";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type Props = PressableProps & {
  label: string
  isActive?: boolean
}

export function Radio({ label, isActive, ...props }: Props) {
  return (
    <Pressable
      style={styles.container}
      {...props}
    >
      {isActive ? (
        <Check width={18} height={18} fill={Colors.blueLight} style={styles.select} />
      ) : (
        <Square width={18} height={18} fill={Colors.gray[400]} style={styles.select} />
      )}

      <Text>{label}</Text>
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