import { useRef, useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { fmtValueToImageUriRequest, parseBRLCurrencyToCents } from "@/utils/dataTransform";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import Colors from "@/constants/Color";

import { Header } from "@/components/Header";
import { Details, PaymentNames, ProductDetailsProps } from "@/components/Details";
import { Button } from "@/components/base/Button";
import { AdPreview } from "@/components/AdPreview";
import { PressableIcon } from "@/components/base/PressableIcon";
import { FormProduct, FormAdProps, FormAdRef } from "@/components/Form/Product";

import type { UserDTO } from "@/dtos/userDTO";
import type { PaymentMethodsResponse, PostImageProps, PostProductRequest } from "@/dtos/productsDTO";

import { useAuth } from "@/hooks/useAuth";
import { postProduct, postProductImages } from "@/services/products";

type ProductProps = {
  images: PostImageProps[]
} & PostProductRequest

export default function CreateAd() {
  const auth = useAuth()
  const user = auth.user as UserDTO

  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({} as ProductProps)
  const [preview, setPreview] = useState({} as ProductDetailsProps)

  const formAdRef = useRef<FormAdRef>(null)

  function handleOnPressNext() {
    if (formAdRef.current) {
      formAdRef.current.submitForm();
    }
  }

  function handleNext(data: FormAdProps) {
    const { price, ...formData } = data

    const paymentArray: PaymentMethodsResponse['payment_methods'] = data.payment_methods.map(
      paymentKeys => ({
        key: paymentKeys,
        name: PaymentNames[paymentKeys]
      })
    )

    const imgArray = data.images.map(img => ({ uri: img.uri }))

    setPreview({
      ...data,
      payment_methods: paymentArray,
      images: imgArray,
      user: {
        avatar: fmtValueToImageUriRequest(user.avatar),
        name: user.name
      }
    })

    setProduct({
      ...formData,
      price: parseBRLCurrencyToCents(price),
    })

    setShowModal(true)
  }

  async function handlePostProduct() {
    try {
      setIsLoading(true)

      const { id } = await postProduct(product)

      await postProductImages({
        product_id: id,
        images: product.images
      })

      router.dismissAll()

    } catch (error) {
      console.log(error)
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

        <FormProduct
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
          product={preview}
          key={'ProductCreateModal'}
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