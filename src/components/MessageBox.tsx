import { StyleSheet, Text, View } from "react-native"

import Colors from "@/constants/Color"
import Fonts from "@/constants/Fonts"

import { BtnVariants, Button } from "@/components/base/Button"

type Props = {
  title: string
  children: React.ReactNode
  btnVariant?: {
    confirm?: BtnVariants
    cancel?: BtnVariants
  }
  onConfirm?: () => void
  onCancel?: () => void
}

export function MessageBox({ title, children: message, btnVariant, onConfirm, onCancel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.text}>
          {message}
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Button
          title="Cancelar"
          variant={btnVariant?.cancel ??'gray'}
          onPress={onCancel}
          style={styles.flex}
        />
        
        <Button
          title="Confirmar"
          variant={btnVariant?.confirm ?? 'blue'}
          onPress={onConfirm}
          style={styles.flex}
        />
      </View>
    </View>
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
  }
})