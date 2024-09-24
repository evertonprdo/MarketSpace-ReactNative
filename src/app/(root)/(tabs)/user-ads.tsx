import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Select } from "@/components/base/Select";
import { PressableIcon } from "@/components/base/PressableIcon";
import { Header } from "@/components/Header";
import { List, ListRequiredProps } from "@/components/List";
import { Loading } from "@/components/base/Loading";

import { useAuth } from "@/hooks/useAuth";
import { getUserProducts } from "@/services/users";

import type { UserDTO } from "@/dtos/userDTO";
import { storageUserProductInfoSave } from "@/storage/storageUserProducts";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/hooks/useToast";

export default function UserAds() {
  const user = useAuth().user as UserDTO
  const Toast = useToast()

  const [prodCount, setProdCount] = useState({ all: 0, active: 0, inactive: 0 })
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [diseabledProductFilter, setDisabledProductStatus] = useState<keyof typeof prodCount>('all')

  const [products, setProducts] = useState<ListRequiredProps[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ListRequiredProps[]>([])

  function handleOnSelectionChange(val: string | null) {
    if (val === diseabledProductFilter)
      return

    if (val === null) return

    setDisabledProductStatus(val as keyof typeof prodCount)
    filterProducts(val)
  }

  function filterProducts(key: string | null) {
    if (key === 'all') {
      return setFilteredProducts(products)
    }

    if (key === 'active') {
      const actArray = products.filter(prod => prod.is_active)

      if (prodCount.active !== actArray.length) {
        setProdCount({
          ...prodCount,
          active: actArray.length ?? 0
        })
      }
      return setFilteredProducts(actArray)
    }

    const inactArray = products.filter(prod => !prod.is_active)

    if (prodCount.inactive !== inactArray.length) {
      setProdCount({
        ...prodCount,
        inactive: inactArray.length
      })
    }
    setFilteredProducts(inactArray)
  }

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true)

      const data = await getUserProducts()

      const prodArray = data.map(({ user_id, payment_methods, accept_trade, description, ...rest }) => {
        return {
          ...rest,
          user: {
            avatar: user.avatar
          },
        }
      })

      const activeProductsAmount = prodArray.reduce((count, obj) => {
        return obj.is_active ? count + 1 : count
      }, 0)

      setProducts(prodArray)
      setFilteredProducts(prodArray)
      
      setProdCount({
        ...prodCount,
        all: prodArray.length
      })

      storageUserProductInfoSave({
        activeProductsAmount
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Não foi possível listar seus produtos, tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  useFocusEffect(useCallback(() => {
    setDisabledProductStatus('all')
    fetchProducts()
  }, []))

  return (
    <View style={styles.container}>
      <Header
        title="Meus anúncios"
        rightIcon={({ tint, size }) => (
          <PressableIcon
            icon={Plus}
            size={size}
            fill={tint}
            onPress={() => router.navigate('/user-ad/create')}
          />
        )}
        style={styles.header}
      />

      <View style={styles.options}>
        <Text style={styles.optionsTitle}>
          {prodCount[diseabledProductFilter]} anúncios
        </Text>

        <Select
          selected={diseabledProductFilter}
          onChangeSelected={handleOnSelectionChange}
        >
          <Select.Option name="all">Todos</Select.Option>
          <Select.Option name="active">Ativos</Select.Option>
          <Select.Option name="inactive">Inativos</Select.Option>
        </Select>
      </View>

      {isLoadingProducts
        ? <Loading />
        : <List
          data={filteredProducts}
          onPressCard={(id) => router.navigate(`/user-ad/${id}`)}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24
  },

  header: {
    marginBottom: 8
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 20,

    zIndex: 30
  },

  optionsTitle: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200]
  }
})