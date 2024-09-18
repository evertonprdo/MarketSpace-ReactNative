import { Pressable, StyleSheet, Text, View } from "react-native";

import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Input } from "@/components/base/Input";
import { Checkable } from "@/components/base/Checkable";
import { Toggle } from "@/components/base/Toggle";

export function Form() {
  return (
    <View style={styles.body}>

      <View style={styles.section}>

        <View style={styles.imageHeader}>
          <Text style={styles.title}>Imagens</Text>
          <Text style={styles.infoText}>
            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
          </Text>
        </View>

        <Pressable style={styles.imgPicker}>
          <Plus height={24} width={24} fill={Colors.gray[400]} />
        </Pressable>

      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Sobre o produto</Text>

        <Input
          placeholder="Título do anúncio"
        />

        <Input
          placeholder="Descrição do produto"
          textAlignVertical="top"
          numberOfLines={8}
          multiline
        />

        <View style={styles.selection}>
          <Checkable label="Produto novo" variant="radio" />
          <Checkable label="Produto usado" variant="radio" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Venda</Text>
        <Input
          placeholder="Valor do produto"
          childDisplacement="left"
        >
          <Text>R$</Text>
        </Input>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aceita troca?</Text>
        <Toggle />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aceita troca?</Text>

        <View style={styles.payment}>
          <Checkable variant="checkbox" label="Boleto" />
          <Checkable variant="checkbox" label="Pix" />
          <Checkable variant="checkbox" label="Dinheiro" />
          <Checkable variant="checkbox" label="Cartão de Crédito" />
          <Checkable variant="checkbox" label="Depósito Bancário" />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  body: { gap: 32 },
  section: { gap: 16 },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[200],
  },

  imageHeader: { gap: 4 },

  infoText: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[300],
  },

  imgPicker: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 100,
    height: 100,

    backgroundColor: Colors.gray[500],
    borderRadius: 6,
  },

  selection: {
    flexDirection: 'row',
    gap: 20
  },

  payment: { gap: 8 },
})