import { forwardRef, useEffect } from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, TextInputProps } from "react-native";
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type Props = Omit<TextInputProps, "children"> & {
  children?: React.ReactNode
  childDisplacement?: 'left' | 'right'
  errorMessage?: string
}

export const Input = forwardRef<TextInput, Props>(({ children, childDisplacement = 'right', onFocus, onBlur, errorMessage, ...props }, ref) => {
  const isOnFocus = useSharedValue(false)
  const isFieldWrong = useSharedValue(!!errorMessage)

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: isFieldWrong.value
      ? withTiming(Colors.redLight)
      : isOnFocus.value
        ? withTiming(Colors.gray[300])
        : withTiming("transparent")
  }))

  function handleOnFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    isOnFocus.value = true

    if (onFocus) onFocus(e)
  }

  function handleOnBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    isOnFocus.value = false

    if (onBlur) onBlur(e)
  }

  useEffect(() => {
    isFieldWrong.value = errorMessage ? true : false
  }, [errorMessage])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {childDisplacement === 'left' && children}

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

      {childDisplacement === 'right' && children}

      {errorMessage && (
        <Animated.View style={styles.absolute} entering={FadeIn} exiting={FadeOut}>
          <Text style={styles.absoluteText}>{errorMessage}</Text>
        </Animated.View>
      )}

    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",

    paddingHorizontal: 16,

    gap: 8,

    backgroundColor: Colors.gray[700],

    borderRadius: 6,
    borderWidth: 1,
  },

  input: {
    flex: 1,

    paddingVertical: 12,

    color: Colors.gray[200],
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
  },

  absolute: {
    position: 'absolute',

    right: 8,
    top: -10,

    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.gray[700],
    borderRadius: 4
  },

  absoluteText: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: 10,
    color: Colors.redLight
  }
})