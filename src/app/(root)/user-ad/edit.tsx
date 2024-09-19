import { useRef, useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";

import Colors from "@/constants/Color";

import { Header } from "@/components/Header";
import { Details, DetailsObjProps } from "@/components/Details";
import { Button } from "@/components/base/Button";
import { AdPreview } from "@/components/AdPreview";
import { PressableIcon } from "@/components/base/PressableIcon";
import { FormAd, FormAdProps, FormAdRef } from "@/components/Form/Ad";

export default function EditAd() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

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
  
  const initValues = {
    ...adDetails,
    price: (adDetails.price / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const formAdRef = useRef<FormAdRef>(null)

  function handleOnPressNext() {
    if (formAdRef.current) {
      formAdRef.current.submitForm();
    }
  }

  function handleNext(data: FormAdProps) {
    const { price, ...formData } = data

    const parsedPrice = Number(price.replace('.', '').replace(',', '.')) * 100

    setAdDetails({
      ...formData,
      price: parsedPrice,
      user: {
        name: 'Maria Gomes',
        avatar: { uri: 'ss' }
      }
    })
    setShowModal(true)
  }

  return (
    <View style={styles.flex}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Editar anúncio"
          leftIcon={({ size, tint }) =>
            <PressableIcon
              icon={ArrowLeft}
              fill={tint}
              size={size}
              onPress={() => router.dismiss()}
            />
          }
        />

        <FormAd
          ref={formAdRef}
          onSubmit={handleNext}
          initValues={initValues}
        />

      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancelar"
          variant="gray"
          style={styles.flex}
          onPress={() => router.dismiss()}
        />

        <Button
          title="Avançar"
          variant="black"
          style={styles.flex}
          onPress={handleOnPressNext}
        />
      </View>

      <AdPreview
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => setIsLoading(true)}
      >
        <Details 
          adDetails={adDetails}
        />
      </AdPreview>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24
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

const testArray = [
  { name: '', type: '', uri: 'https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg' },
  { name: '', type: '', uri: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { name: '', type: '', uri: 'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp' }
]