import { useCallback, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { fmtValueToImageUriRequest, formatCentsToBRLCurrency, parseBRLCurrencyToCents } from "@/utils/dataTransform";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import Colors from "@/constants/Color";

import { Header } from "@/components/Header";
import { Button } from "@/components/base/Button";
import { AdPreview } from "@/components/AdPreview";
import { Loading } from "@/components/base/Loading";
import { PressableIcon } from "@/components/base/PressableIcon";
import { FormProduct, FormAdProps, FormAdRef } from "@/components/Form/Product";
import { Details, PaymentNames, ProductDetailsProps } from "@/components/Details";

import type { PaymentMethodsResponse, PostImageProps, PostProductRequest, ProductImageResponse } from "@/dtos/productsDTO";
import type { UserDTO } from "@/dtos/userDTO";

import { useAuth } from "@/hooks/useAuth";
import { deleteProductImages, getProductById, postProductImages, putProduct } from "@/services/products";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/hooks/useToast";

type ProductProps = {
  images: PostImageProps[]
} & PostProductRequest

export default function EditAd() {
  const params = useLocalSearchParams();
  const productId = params.id as string

  const auth = useAuth()
  const user = auth.user as UserDTO
  const Toast = useToast()

  const [showModal, setShowModal] = useState(false);
  const [isFetchingProduct, setIsFetchingProduct] = useState(true)
  const [isSending, setIsSending] = useState(false)

  const [serverImages, setServerImages] = useState<ProductImageResponse['product_images']>([])
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

    const prevImgArray = data.images.map(img => ({ uri: img.uri }))

    setPreview({
      ...data,
      payment_methods: paymentArray,
      images: prevImgArray,
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

  async function fetchProduct() {
    try {
      setIsFetchingProduct(true)

      const { product_images, user, price, payment_methods, ...data } = await getProductById(productId)

      setServerImages(product_images.map(img => ({
        id: img.id,
        path: fmtValueToImageUriRequest(img.path)
      })))

      const images = product_images.map(img => ({
        name: '_',
        uri: fmtValueToImageUriRequest(img.path),
        type: '_'
      }))

      const paymentArray = payment_methods.map(item => item.key)

      setProduct({
        ...data,
        images,
        price: price,
        payment_methods: paymentArray
      })

    } catch (error: any) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Erro ao carregar produto. tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)

    } finally {
      setIsFetchingProduct(false)
    }
  }

  async function updateProduct() {
    try {
      setIsSending(true)

      const oldImgPaths = serverImages.map(img => img.path)
      const newImgUris = product.images.map(img => img.uri)

      let dropImg: string[] = []
      let postImg: PostImageProps[] = []

      for (let i = 0; i < 3; i++) {
        if (product.images[i] && !oldImgPaths.includes(product.images[i].uri)) {
          postImg.push(product.images[i])
        }

        if (serverImages[i] && !newImgUris.includes(serverImages[i].path)) {
          dropImg.push(serverImages[i].id)
        }
      }

      if (postImg.length > 0) {
        await postProductImages({
          product_id: productId,
          images: postImg
        })
      }

      if (dropImg.length > 0) {
        await deleteProductImages({ productImagesIds: dropImg })
      }

      await putProduct(productId, product)

      Toast.showToast('Anúncio atualizado com sucesso', 'green')

      router.dismissAll()

    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Erro ao atualizar o anúncio. tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)

      setIsSending(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProduct()
  }, []))

  if (isFetchingProduct) return <Loading />

  const initialValues = {
    ...product,
    price: formatCentsToBRLCurrency(product.price)
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

        <FormProduct
          ref={formAdRef}
          onSubmit={handleNext}
          initValues={initialValues}
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
        onConfirm={updateProduct}
        isLoading={isSending}
      >
        <Details
          product={preview}
          key={'ProductEditModal'}
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