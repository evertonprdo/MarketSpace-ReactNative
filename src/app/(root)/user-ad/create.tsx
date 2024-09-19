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

export default function CreateAd() {
  const [showModal, setShowModal] = useState(false);

  const [preview, setPreview] = useState<DetailsObjProps>({} as DetailsObjProps)
  const [isLoading, setIsLoading] = useState(false)

  const formAdRef = useRef<FormAdRef>(null)

  function handleOnPressNext() {
    if (formAdRef.current) {
      formAdRef.current.submitForm();
    }
  }

  function handleNext(data: FormAdProps) {
    const { price, ...formData } = data

    const parsedPrice = Number(price.replace('.', '').replace(',', '.')) * 100

    setPreview({
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
          title="Criar anúncio"
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
        isLoading={isLoading}
      >
        <Details
          adDetails={preview}
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