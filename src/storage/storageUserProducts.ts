import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_PRODUCTS_INFO_STORAGE } from "./storage.config"

type UserProductInfoStorage = {
  activeProductsAmount: number
}

export async function storageUserProductInfoSave(props: UserProductInfoStorage) {
  try {
    await AsyncStorage.setItem(USER_PRODUCTS_INFO_STORAGE, JSON.stringify(props))

  } catch (error) {
    throw error
  }
}

export async function storageUserProductInfoGet() {
  try {
    const response = await AsyncStorage.getItem(USER_PRODUCTS_INFO_STORAGE)

    const data: UserProductInfoStorage = response
      ? JSON.parse(response)
      : { activeProductsAmount: 0 }
      
    return data

  } catch (error) {
    throw error
  }
}

export async function storageUserProductInfoRemove() {
  try {
    await AsyncStorage.removeItem(USER_PRODUCTS_INFO_STORAGE)
  } catch (error) {
    throw error
  }
}