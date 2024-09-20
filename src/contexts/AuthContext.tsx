import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { router } from "expo-router";

import { UserDTO } from "@/dtos/userDTO";
import { api } from "@/services/api";
import { postSession } from "@/services/sessions";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@/storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "@/storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextDataProps | null>(null);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserDTO | null>(null)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(false)

  function useAndTokenUpdate(userData: UserDTO | null, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave({ token, refresh_token })

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const data = await postSession(email, password)

      useAndTokenUpdate(data.user, data.token)
      await storageUserAndTokenSave(
        data.user,
        data.token,
        data.refresh_token
      )

      if (router.canDismiss()) {
        router.dismissAll()
      }
      router.replace('/')

    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)

      if (user === null) return

      setUser(null);
      await storageUserRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const user = await storageUserGet()
      const authTokens = await storageAuthTokenGet()

      if (user && authTokens) {
        useAndTokenUpdate(user, authTokens.token)
      }

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenMenager(signOut)

    return () => {
      subscribe();
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}