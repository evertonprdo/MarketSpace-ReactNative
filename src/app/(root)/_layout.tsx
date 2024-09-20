import { Redirect, Stack } from "expo-router";

import { Loading } from "@/components/base/Loading";

import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  const { user, isLoadingUserStorageData } = useAuth()

  if (isLoadingUserStorageData) return <Loading/>

  if (!user) return <Redirect href={"/auth/sign-in"} />

  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' }
    }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="[product-id]" />
      <Stack.Screen name="user-ad/create" />
      <Stack.Screen name="user-ad/edit" />
      <Stack.Screen name="user-ad/[id]" />
    </Stack>
  )
}