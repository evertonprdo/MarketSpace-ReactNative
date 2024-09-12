import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import PencilSimpleLine from "@/assets/icons/PencilSimpleLine";
import Power from "@/assets/icons/Power";
import Trash from "@/assets/icons/Trash";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Button } from "@/components/Button";
import { Details } from "@/components/Details";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { PressableIcon } from "@/components/PressableIcon";
import { router } from "expo-router";
import { MessageBox } from "@/components/MessageBox";

export default function UserAdDetails() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const dinamicText = isDisabled ? 'Reativar' : 'Desativar'
  const btnVariant = isDisabled ? 'blue' : 'black'

  return (
    <View style={styles.flex}>
      <Header
        style={styles.header}
        leftIcon={({ size, tint }) =>
          <PressableIcon
            icon={ArrowLeft}
            fill={tint}
            size={size}
            onPress={() => router.dismiss()}
          />
        }
        rightIcon={({ size, tint }) =>
          <PressableIcon
            icon={PencilSimpleLine}
            fill={tint}
            size={size}
            onPress={() => router.navigate('/user-ad/edit')}
          />
        }
      />

      <Details tempProp={isDisabled}>
        <View style={styles.buttonsCotainer}>
          {isDisabled ? (
            <Button
              key={'btnBlue'}
              title={'Desativar anúncio'}
              variant={'blue'}
              icon={Power}
              onPress={() => setShowModal(true)}
            />
          ) : (
            <Button
              key={'btnGray'}
              title={'Reativar anúncio'}
              variant={'black'}
              icon={Power}
              onPress={() => setShowModal(true)}
            />
          )}
          <Button
            title="Excluir anúncio"
            variant="gray"
            icon={Trash}
          />
        </View>
      </Details>

      <Modal
        visible={showModal}
        contentContainerStyle={styles.modalContentContainer}
      >
        <MessageBox
          title="Visibilidade do anúncio"
          btnVariant={{ confirm: btnVariant }}
          onCancel={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); setIsDisabled(!isDisabled) }}
        >
          Você está prestes a
          <Text style={styles.modalBold}>
            {` ${dinamicText} `}
          </Text>
          a visibilidade do seu anúncio, tem certeza que deseja fazer isso?
        </MessageBox>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

  buttonsCotainer: {
    gap: 8
  },

  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 24
  },

  modalBold: {
    fontFamily: Fonts.FontFamily.bold,
    textTransform: 'lowercase'
  },
})