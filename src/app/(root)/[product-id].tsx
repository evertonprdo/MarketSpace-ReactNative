import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

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

export default function AdDetails() {
  const params = useLocalSearchParams();
  const productId = params['product-id'] as string

  const [product, setProduct] = useState<ProductDetailsProps>()
  const [isFetchingProduct, setIsFetchingProduct] = useState(true)

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
        },
        price: formatCentsToBRLCurrency(price)
      })

    } catch (error: any) {
      console.log(error)

    } finally {
      setIsFetchingProduct(false)
    }
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

        <Button title="Entrar em contato" icon={Whatsapp} variant="blue" />
      </View>
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
  }
})