import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import XCircleFill from "@/assets/icons/XCircle";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type Props = PressableProps & {
  label: string
  value?: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Tag({ label, value, ...props }: Props) {
  const isActive = useSharedValue(false);

  isActive.value = value ?? false

  const animContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: isActive.value
      ? withTiming(Colors.blueLight)
      : withTiming(Colors.gray[500]),
  }))

  const animIconStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: isActive.value
        ? withTiming(1)
        : withTiming(0, { duration: 240 })
    }],

    marginRight: isActive.value
      ? withTiming(-10)
      : withTiming(-22)
  }))

  const animTextStyle = useAnimatedStyle(() => ({
    color: isActive.value
      ? withTiming(Colors.gray[700])
      : withTiming(Colors.gray[300])
  }))

  return (
    <AnimatedPressable
      style={[animContainerStyle, styles.container]}
      hitSlop={8}
      {...props}
    >
      <Animated.Text style={[styles.text, animTextStyle]}>
        {label}
      </Animated.Text>

      <Animated.View style={animIconStyle}>
        <XCircleFill width={16} height={16} fill={Colors.gray[600]} />
      </Animated.View>

    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",

    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 6,

    borderRadius: 999
  },

  text: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.sm,
    textTransform: "uppercase",
    paddingVertical: 1
  }
})