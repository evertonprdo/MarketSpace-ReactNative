import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { fmtValueToImageUriRequest } from "@/utils/dataTransform";

import { Search } from "@/components/Form/Search";
import { Button } from "@/components/base/Button";
import { List, ListRequiredProps } from "@/components/List";
import { InfoCard } from "@/components/InfoCard";

import type { UserDTO } from "@/dtos/userDTO";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { AppError } from "@/utils/AppError";

import { storageUserProductInfoGet } from "@/storage/storageUserProducts";
import { getProducts, GetProductsParams } from "@/services/products";

export default function Home() {
  const user = useAuth().user as UserDTO
  const Toast = useToast()

  const [products, setProducts] = useState<ListRequiredProps[]>([])
  const [isFetchingData, setIsLoadingProducts] = useState(true)
  const [activeAmount, setActiveAmount] = useState(0)

  const [query, setQuery] = useState<GetProductsParams>({})

  const avatar = fmtValueToImageUriRequest(user?.avatar)

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true)

      const data = await getProducts(query)
      setProducts(data)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : "Erro ao listar produtos. tente novamente mais tarde."

      Toast.showToast(title, 'red')
      console.log(error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  async function fetchUserProductsInfo() {
    try {
      const { activeProductsAmount } = await storageUserProductInfoGet()
      setActiveAmount(activeProductsAmount)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProducts()
  }, [query]))

  useFocusEffect(useCallback(() => {
    fetchUserProductsInfo()
  }, []))

  return (
    <List
      data={isFetchingData ? [] : products}
      onPressCard={(id) => router.navigate({
        pathname: '/[product-id]',
        params: { "product-id": id }
      })}
      isFetchingProducts={isFetchingData}
      style={styles.contentContainer}
      ListHeaderComponent={(
        <View style={styles.headerContainer}>
          <SafeAreaView style={styles.header}>

            <View style={styles.user}>
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
              />

              <Text style={styles.welcomeText} numberOfLines={2} ellipsizeMode="clip">
                Boas vindas,{" \n"}
                <Text style={styles.welcomeBold}>
                  {user?.name}!
                </Text>
              </Text>
            </View>

            <Button
              title="Criar anúncio"
              variant="black"
              icon={Plus}
              onPress={() => router.navigate('/user-ad/create')}
            />

          </SafeAreaView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Seus produtos anunciados para venda
            </Text>

            <InfoCard count={activeAmount} onPress={() => router.navigate('/user-ads')} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compre produtos variados</Text>

            <Search
              onSubmit={setQuery}
            />
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
  },

  headerContainer: { gap: 32 },
  header: { gap: 8, flexDirection: "row" },

  user: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: 'center'
  },
  avatar: {
    height: 45,
    width: 45,

    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.blueLight
  },

  welcomeText: {
    flex: 1,
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[100],
  },
  welcomeBold: {
    fontFamily: Fonts.FontFamily.bold
  },

  section: { gap: 12 },
  sectionTitle: {
    color: Colors.gray[300],
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
  }
})