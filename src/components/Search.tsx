import { StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

import Sliders from "@/assets/icons/Sliders";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass";
import X from "@/assets/icons/X";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { Input } from "@/components/Input";
import { PressableIcon } from "@/components/PressableIcon";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "./Button";
import { Tag } from "./Tag";
import { Toggle } from "./Toggle";
import { Checkable } from "./Checkable";

export function Search() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Input
        placeholder="Buscar anúncio"
      >
        <PressableIcon
          icon={MagnifyingGlass}
          size={20}
          stroke={Colors.gray[200]}

        />

        <View style={styles.divider} />

        <PressableIcon
          icon={Sliders}
          size={20}
          stroke={Colors.gray[200]}
          onPress={() => setShowModal(true)}
        />
      </Input>

      <Modal
        visible={showModal}
        contentContainerStyle={styles.modalContentContainer}
      >
        <Animated.View
          style={styles.content}
          entering={SlideInDown.delay(150).duration(750)}
        >

          <View style={styles.itens}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filtrar anúncios</Text>

              <PressableIcon
                icon={X}
                size={24}
                fill={Colors.gray[400]}
                onPress={() => setShowModal(false)}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Condição</Text>

              <View style={styles.optsCondition}>
                <Tag label="Novo" />
                <Tag label="Usado" />
              </View>

            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Aceita troca?</Text>

              <Toggle />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Meios de pagamento aceitos</Text>

              <View style={styles.optsPayment}>
                <Checkable label="Boleto" variant="checkbox" />
                <Checkable label="Pix" variant="checkbox" />
                <Checkable label="Dinheiro" variant="checkbox" />
                <Checkable label="Cartão de Crédito" variant="checkbox" />
                <Checkable label="Depósito Bancário" variant="checkbox" />
              </View>
            </View>

          </View>

          <View style={styles.actions}>
            <Button
              title="Resetar filtros"
              variant="gray"
              style={styles.button}
            />
            <Button
              title="Aplicar filtros"
              variant="black"
              style={styles.button}
            />
          </View>

        </Animated.View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    width: 1,
    backgroundColor: Colors.gray[400],
    height: 18
  },

  modalContentContainer: {
    justifyContent: 'flex-end',
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 48,
    gap: 64,

    backgroundColor: Colors.gray[600],

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    elevation: 30,

    shadowOpacity: 0.1,
    shadowOffset: { height: -20, width: 0 },
    shadowRadius: 30,
  },

  itens: { gap: 24 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  headerTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[100]
  },

  section: { gap: 12 },

  sectionTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200]
  },

  optsCondition: {
    flexDirection: 'row',
    gap: 8
  },

  optsPayment: {
    gap: 8
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  button: { flex: 1 },
})