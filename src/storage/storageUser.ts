import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE } from "./storage.config";
import type { UserDTO } from "@/dtos/userDTO";

export async function storageUserSave({ id, name, avatar, tel }: UserDTO) {
  await AsyncStorage.setItem(
    USER_STORAGE,
    JSON.stringify({
      id,
      name,
      avatar,
      tel,
    })
  )
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user: UserDTO | null = storage
    ? JSON.parse(storage)
    : null

  return user
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}