import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, ReduceMotion } from "react-native-reanimated";
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
const animConfig = {
  duration: 100,
  easing: Easing.out(Easing.circle),
}

export function Button({ title, variant, icon: Icon, onPressIn, onPressOut, ...props }: Props) {
  const isPressedIn = useSharedValue(false)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: isPressedIn.value
      ? withTiming(variantStyles[variant].bgActive, animConfig)
      : withTiming(variantStyles[variant].bg, animConfig),

    transform: [{
      scale: isPressedIn.value
        ? withTiming(0.93, animConfig)
        : withTiming(1, animConfig)
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
      style={[styles.container, animatedStyle]}
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
    bgActive: Colors.gray[200],
    color: Colors.gray[700]
  },
  blue: {
    bg: Colors.blueLight,
    bgActive: Colors.blue,
    color: Colors.gray[700]
  },
  gray: {
    bg: Colors.gray[500],
    bgActive: Colors.gray[400],
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