import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

type Variants = keyof typeof variantStyles

type Props = Omit<PressableProps, "children"> & {
  variant: Variants
  title: string
  icon?: (props: SvgProps) => React.JSX.Element
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const animDuration = 100

export function Button({ title, variant, icon: Icon, onPressIn, onPressOut, ...props }: Props) {
  const isPressedIn = useSharedValue(false)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: isPressedIn.value
        ? withTiming(0.93, { duration: animDuration })
        : withTiming(1, { duration: animDuration })
    }]
  }))

  function handleOnPressIn(event: GestureResponderEvent) {
    isPressedIn.value = true

    if (onPressIn) onPressIn(event)
  }

  function handleOnPressOut(event: GestureResponderEvent) {
    isPressedIn.value = false

    if (onPressOut) onPressOut(event)
  }

  return (
    <AnimatedPressable
      style={[styles.container, { backgroundColor: variantStyles[variant].bg }, animatedStyle]}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      {...props}
    >
      {Icon && <Icon fill={variantStyles[variant].color} height={16} width={16} />}

      <Text style={[styles.text, { color: variantStyles[variant].color }]}>
        {title}
      </Text>
    </AnimatedPressable>
  )
}

const variantStyles = {
  black: {
    bg: Colors.gray[100],
    color: Colors.gray[700]
  },
  blue: {
    bg: Colors.blueLight,
    color: Colors.gray[700]
  },
  gray: {
    bg: Colors.gray[500],
    color: Colors.gray[200]
  },
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 8,
    padding: 12,
    borderRadius: 6,
  },
  text: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md
  }
})