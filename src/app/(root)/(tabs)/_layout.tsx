import HouseBold from "@/assets/icons/HouseBold";
import SingOut from "@/assets/icons/SingOut";
import TagRegular from "@/assets/icons/TagRegular";
import Colors from "@/constants/Color";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

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
          tabBarIcon: ({ color }) => <HouseBold fill={color} height={IconSize} width={IconSize} />
        }}
      />

      <Tabs.Screen
        name="user-ads"
        options={{
          tabBarIcon: ({ color }) => <TagRegular fill={color} height={IconSize} width={IconSize} />
        }}
      />

      <Tabs.Screen
        name="sing-out"
        options={{
          tabBarIcon: () => <SingOut fill={"#E07878"} height={IconSize} width={IconSize} />
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