import { useSession } from "@/contexts/AuthContext";
import { Redirect, router, Slot, Tabs, usePathname } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { session } = useSession()

  const pathname = usePathname()

  if (!session) {
    return <Redirect href={{ pathname: "/auth/sing-in", params: { redirectUrl: pathname } }} />
  }

  return (
    <Tabs>
      <Tabs.Screen name="index"/>
      <Tabs.Screen name="user-ads"/>
      <Tabs.Screen name="profile"/>
    </Tabs>
  )
}