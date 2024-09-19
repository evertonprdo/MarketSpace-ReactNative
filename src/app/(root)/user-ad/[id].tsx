import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import PencilSimpleLine from "@/assets/icons/PencilSimpleLine";
import Power from "@/assets/icons/Power";
import Trash from "@/assets/icons/Trash";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Button } from "@/components/base/Button";
import { Details, DetailsObjProps } from "@/components/Details";
import { Header } from "@/components/Header";
import { Modal } from "@/components/base/Modal";
import { PressableIcon } from "@/components/base/PressableIcon";
import { router } from "expo-router";
import { MessageBox } from "@/components/MessageBox";

export default function UserAdDetails() {
  const [adDetails, setAdDetails] = useState<DetailsObjProps>({
    user: {
      avatar: { uri: 'sad' },
      name: 'Maria Gomes'
    },
    images: testArray,
    name: 'Tênis vermelho',
    description: 'Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. ',
    accept_trade: true,
    is_new: true,
    payment_methods: ['boleto', 'card', 'cash', 'deposit', 'pix'],
    price: 15049
  })

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

      <Details
        adDetails={adDetails}
        disabledAd={isDisabled}
      >
        <View style={styles.buttonsCotainer}>
          {isDisabled ? (
            <Button
              key={'btnBlue'}
              title={'Reativar anúncio'}
              variant={'blue'}
              icon={Power}
              onPress={() => setShowModal(true)}
            />
          ) : (
            <Button
              key={'btnGray'}
              title={'Desativar anúncio'}
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

const testArray = [
  { uri: 'https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg' },
  { uri: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { uri: 'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp' }
]