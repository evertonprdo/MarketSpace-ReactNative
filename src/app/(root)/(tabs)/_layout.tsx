import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import HouseBold from "@/assets/icons/HouseBold";
import HouseRegular from "@/assets/icons/HouseRegular";
import TagBold from "@/assets/icons/TagBold";
import TagRegular from "@/assets/icons/TagRegular";
import SignOut from "@/assets/icons/SignOut";

import Colors from "@/constants/Color";

const IconSize = 24

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.gray[200],
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
      }}
      sceneContainerStyle={{
        backgroundColor: 'transparent'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <HouseBold fill={color} height={IconSize} width={IconSize} />
              : <HouseRegular fill={color} height={IconSize} width={IconSize} />
          )
        }}
      />

      <Tabs.Screen
        name="user-ads"
        options={{
          tabBarIcon: ({ color, focused }) => (
            focused
              ? <TagBold fill={color} height={IconSize} width={IconSize} />
              : <TagRegular fill={color} height={IconSize} width={IconSize} />
          )
        }}
      />

      <Tabs.Screen
        name="sign-out"
        options={{
          tabBarIcon: () => <SignOut fill={"#E07878"} height={IconSize} width={IconSize} />
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingHorizontal: 8,
    backgroundColor: Colors.gray[700],
    borderTopWidth: 0
  },
  tabBarItem: {
    paddingTop: 20,
    paddingBottom: 28
  }
})