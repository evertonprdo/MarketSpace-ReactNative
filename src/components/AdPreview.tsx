import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./base/Button";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import TagRegular from "@/assets/icons/TagRegular";
import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type Props = ModalProps & {
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function AdPreview({ onConfirm, onCancel, isLoading, children, ...props }: Props) {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      {...props}
    >
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Pré visualização do anúncio</Text>
        <Text style={styles.text}>É assim que seu produto vai aparecer!</Text>
      </SafeAreaView>

      <View style={styles.content}>
        {children}
      </View>

      <View style={styles.footer}>
        <Button
          title="Voltar e editar"
          variant="gray"
          style={styles.flex}
          icon={ArrowLeft}
          onPress={onCancel}
        />

        <Button
          title="Publicar"
          variant="blue"
          style={styles.flex}
          icon={TagRegular}
          onPress={onConfirm}
          isLoading={isLoading}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  content: {
    flex: 1,
    backgroundColor: Colors.gray[600]
  },

  header: {
    padding: 24,
    paddingBottom: 16,

    backgroundColor: Colors.blueLight
  },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[700],

    textAlign: 'center'
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[700],

    textAlign: 'center'
  },

  footer: {
    flexDirection: 'row',
    gap: 12,

    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,

    backgroundColor: Colors.gray[700]
  },
})