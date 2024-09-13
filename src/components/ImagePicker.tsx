import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import User from "@/assets/icons/User";
import PencilSimpleLine from "@/assets/icons/PencilSimpleLine";

import Colors from "@/constants/Color";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const animConfig = {
  duration: 150,
  easing: Easing.out(Easing.poly(4)),
}

export function ImagePicker({ ...props }: Omit<ViewProps, 'children'>) {
  const isPressedIn = useSharedValue(false);

  const animStyles = useAnimatedStyle(() => ({
    backgroundColor: isPressedIn.value
      ? withTiming(Colors.blue, animConfig)
      : withTiming(Colors.blueLight, animConfig)
  }))

  return (
    <View {...props}>
      <View style={styles.photoContainer}>
        <User height={48} width={48} fill={Colors.gray[400]} />
      </View>

      <AnimatedPressable
        style={[styles.btn, animStyles]}
        onPressIn={() => isPressedIn.value = true}
        onPressOut={() => isPressedIn.value = false}
      >
        <PencilSimpleLine width={16} height={16} fill={Colors.gray[600]} />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 88,
    width: 88,

    backgroundColor: Colors.gray[500],

    borderColor: Colors.blueLight,
    borderRadius: 999,
    borderWidth: 3,
  },

  btn: {
    position: 'absolute',

    padding: 12,
    bottom: 0,
    left: 56,

    borderRadius: 999,
  },
})