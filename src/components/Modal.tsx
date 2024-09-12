import { BlurView } from "expo-blur";
import { Modal as DefaultModal, ModalProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = ModalProps & {
  contentContainerStyle?: StyleProp<ViewStyle>
}

export function Modal({ children, contentContainerStyle, ...props }: Props) {
  return (
    <DefaultModal
      animationType="fade"
      statusBarTranslucent
      transparent
      {...props}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={10}
        blurReductionFactor={28}
        experimentalBlurMethod="dimezisBlurView"
      >
        <View style={[styles.background, contentContainerStyle]}>
          {children}
        </View>
      </BlurView>
    </DefaultModal>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#00000099'
  }
})