import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Colors from "@/constants/Color";

type Props = PressableProps & {
  value?: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function Toggle({ value, ...props }: Props) {
  const isActive = useSharedValue(false);

  isActive.value = value ?? false

  const padHorizontal = [24, 2]

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: isActive.value
      ? withTiming(Colors.blueLight)
      : withTiming(Colors.gray[500]),

    paddingLeft: isActive.value
      ? withTiming(padHorizontal[0])
      : withTiming(padHorizontal[1]),

    paddingRight: isActive.value
      ? withTiming(padHorizontal[1])
      : withTiming(padHorizontal[0])
  }))

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyles]}
      hitSlop={8}
      {...props}
    >

      <View style={styles.circle} />
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    borderRadius: 999,
    alignSelf: "flex-start"
  },

  circle: {
    backgroundColor: Colors.gray[700],
    width: 24,
    height: 24,
    borderRadius: 999,
  }
})