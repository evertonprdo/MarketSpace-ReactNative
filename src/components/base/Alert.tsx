import { ModalProps, StyleSheet, Text, View } from "react-native";
import { Modal } from "./Modal";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";
import { Button } from "./Button";

type Props = ModalProps & {
  title: string
  message: string
  onConfirm: () => void
}

export function Alert({ title, message, onConfirm, ...props }: Props) {
  return (
    <Modal contentContainerStyle={styles.modalContent} {...props}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.text}>
            {message}
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Confirmar"
            variant="blue"
            onPress={onConfirm}
            style={styles.flex}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  container: {
    padding: 24,
    gap: 32,

    backgroundColor: Colors.gray[700],
    borderRadius: 8,
  },

  header: {
    gap: 16
  },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[100]
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200]
  },

  btnContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  modalContent: {
    justifyContent: 'center',
    paddingHorizontal: 24
  }
})