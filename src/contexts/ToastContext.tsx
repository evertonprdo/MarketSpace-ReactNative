import { Toast } from "@/components/base/Toast";
import Colors from "@/constants/Color";
import { createContext, type PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useSharedValue, withTiming, Easing } from "react-native-reanimated";

type ToastVariants = 'red' | 'green' | 'gray'
export const ToastContext = createContext({ showToast: (message: string, bgColor?: ToastVariants) => { } });

const BgVariantsColors = {
  red: Colors.red,
  green: Colors.green,
  gray: Colors.gray[400]
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState(BgVariantsColors.gray)

  const top = useSharedValue(-52)
  const duration = 1000
  const messageDuration = 2000

  function showToast(message: string, bgColor: ToastVariants = 'gray') {
    setMessage(message);
    setBgColor(BgVariantsColors[bgColor])
    setIsVisible(true);
  };

  function toastAnimation() {
    top.value = withTiming(-top.value, {
      duration,
      easing: Easing.out(Easing.cubic)
    })
  }

  async function popToast() {
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    toastAnimation();
    await wait(duration + messageDuration)

    toastAnimation();
    await wait(duration)

    setIsVisible(false);
  }

  useEffect(() => {
    if (isVisible) {
      popToast();
    }
  }, [isVisible])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {isVisible && (
        <Animated.View style={[styles.container, { top }]}>

          <Toast
            message={message}
            style={{ backgroundColor: bgColor }}
          />

        </Animated.View>
      )}

      {children}
    </ToastContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',

    width: '100%',
    padding: 16,

    zIndex: 30,
  },
})