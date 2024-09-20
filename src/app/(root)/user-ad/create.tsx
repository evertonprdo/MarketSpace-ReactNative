import { useRef, useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";

import Colors from "@/constants/Color";

import { Header } from "@/components/Header";
import { Details } from "@/components/Details";
import { Button } from "@/components/base/Button";
import { AdPreview } from "@/components/AdPreview";
import { PressableIcon } from "@/components/base/PressableIcon";
import { FormAd, FormAdProps, FormAdRef } from "@/components/Form/Ad";

import type { UserDTO } from "@/dtos/userDTO";
import type { PostProductRequest } from "@/dtos/productsDTO";

import { useAuth } from "@/hooks/useAuth";
import { postProduct, postProductImages, PostProductImagesRequest } from "@/services/products";

type ProductPreviewProps = { user: UserDTO }
  & PostProductRequest
  & Omit<PostProductImagesRequest, 'product_id'>

export default function CreateAd() {
  const auth = useAuth()
  const user = auth.user as UserDTO

  const [showModal, setShowModal] = useState(false);

  const [preview, setPreview] = useState({} as ProductPreviewProps)
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
      user
    })
    setShowModal(true)
  }

  async function handlePostProduct() {
    try {
      setIsLoading(true)

      const { id } = await postProduct(preview)

      await postProductImages({
        product_id: id,
        images: preview.images
      })

      router.dismissAll()
      router.navigate({
        pathname: '/user-ad/[id]',
        params: { id }
      })
    } catch (error) {
      setIsLoading(false)
    }
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
        onConfirm={handlePostProduct}
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