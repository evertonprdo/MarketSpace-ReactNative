import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Linking, StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import Whatsapp from "@/assets/icons/Whatsapp";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Header } from "@/components/Header";
import { PressableIcon } from "@/components/base/PressableIcon";
import { Button } from "@/components/base/Button";
import { Details, ProductDetailsProps } from "@/components/Details";
import { Loading } from "@/components/base/Loading";

import { fmtValueToImageUriRequest, formatCentsToBRLCurrency } from "@/utils/dataTransform";
import { getProductById } from "@/services/products";
import { Modal } from "@/components/base/Modal";
import { MessageBox } from "@/components/MessageBox";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/hooks/useToast";

export default function AdDetails() {
  const params = useLocalSearchParams();
  const productId = params['product-id'] as string

  const Toast = useToast()

  const [product, setProduct] = useState<ProductDetailsProps & { user: { tel: string } }>()
  const [isFetchingProduct, setIsFetchingProduct] = useState(true)
  const [showModal, setShowModal] = useState(false)

  async function fetchProduct() {
    try {
      setIsFetchingProduct(true)
      const { id, user_id, product_images, user, price, ...data } = await getProductById(productId)

      const images = product_images.map(img => ({
        uri: fmtValueToImageUriRequest(img.path)
      }))

      setProduct({
        ...data,
        images,
        user: {
          name: user.name,
          avatar: fmtValueToImageUriRequest(user.avatar),
          tel: user.tel
        },
        price: formatCentsToBRLCurrency(price)
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

  function handleOnConfirm() {
    setShowModal(false)
    const encodedText = encodeURIComponent(`Olá! Gostaria de saber mais sobre o *${product?.name}*, o item ainda está disponivel?`)

    Linking.openURL(`https://wa.me/${product?.user.tel}?text=${encodedText}`)
  }

  useFocusEffect(useCallback(() => {
    fetchProduct()
  }, []))

  if (isFetchingProduct) return <Loading />
  if (!product) return router.back()

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        leftIcon={({ tint, size }) => (
          <PressableIcon
            icon={ArrowLeft}
            size={size}
            fill={tint}
            onPress={() => router.dismiss()}
          />
        )}
      />

      <Details
        product={product}
      />

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          R${' '}
          <Text style={styles.footerPrice}>
            {product.price}
          </Text>
        </Text>

        <Button
          title="Entrar em contato"
          icon={Whatsapp}
          variant="blue"
          onPress={() => setShowModal(true)}
        />
      </View>

      <Modal
        visible={showModal}
        contentContainerStyle={styles.modalContentContainer}
      >
        <MessageBox
          title="Contatar vendedor"
          onCancel={() => setShowModal(false)}
          onConfirm={handleOnConfirm}
        >
          Você está prestes a{' '}
          <Text style={styles.modalBold}>
            entrar em contato
          </Text>
          {' '}com o anunciante, você será redirecionado para o Whatsapp do vendedor.
        </MessageBox>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: Colors.gray[700],

    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  footerText: {
    fontSize: Fonts.FontSize.md,
    fontFamily: Fonts.FontFamily.bold,
    color: Colors.blue,
  },
  footerPrice: {
    fontSize: Fonts.FontSize.xxl
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