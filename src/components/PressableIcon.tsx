import Colors from "@/constants/Color";
import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

type Props = PressableProps & {
  icon: (props: SvgProps) => React.JSX.Element
  size: number
  fill?: string
  stroke?: string
}

const hitSlup = 6
const animConfig = {
  duration: 128,
  easing: Easing.out(Easing.circle)
}

export function PressableIcon({ icon: Icon, fill = 'none', stroke = 'none', size, onPressIn, onPressOut, ...props }: Props) {
  const isPressedIn = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: isPressedIn.value
      ? withTiming(`${Colors.gray[200]}22`, animConfig)
      : withTiming('transparent', animConfig)
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
    <Pressable
      style={styles.container}
      hitSlop={hitSlup}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      {...props}
    >
      <Animated.View style={[styles.activeIndicator, animatedStyle]} />
      <Icon width={size} height={size} fill={fill} stroke={stroke} style={styles.iconContainer} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
  },

  activeIndicator: {
    position: 'absolute',

    bottom: -hitSlup,
    left: -hitSlup,
    right: -hitSlup,
    top: -hitSlup,

    borderRadius: 999,
    pointerEvents: 'none'
  },

  iconContainer: {
    flex: 1
  },
})