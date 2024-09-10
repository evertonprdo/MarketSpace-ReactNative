import { forwardRef } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type Props = Omit<TextInputProps, "children"> & {
  children?: React.ReactNode
}

export const Input = forwardRef<TextInput, Props>(({ children, onFocus, onBlur, ...props }, ref) => {
  const isOnFocus = useSharedValue(false)

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: isOnFocus.value
      ? withTiming(Colors.gray[300])
      : withTiming("transparent")
  }))

  function handleOnFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    isOnFocus.value = true

    if(onFocus) onFocus(e)
  }

  function handleOnBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    isOnFocus.value = false

    if(onBlur) onBlur(e)
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholderTextColor={Colors.gray[400]}
        cursorColor={Colors.gray[300]}
        selectionColor={Colors.gray[500]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...props}
      />
      {children}
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,

    backgroundColor: Colors.gray[700],

    borderRadius: 6,
    borderWidth: 1,
  },
  input: {
    flex: 1,

    color: Colors.gray[200],
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
  }
})