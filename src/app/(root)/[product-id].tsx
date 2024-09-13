import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import Whatsapp from "@/assets/icons/Whatsapp";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Header } from "@/components/Header";
import { PressableIcon } from "@/components/base/PressableIcon";
import { Button } from "@/components/base/Button";
import { Details } from "@/components/Details";

export default function AdDetails() {
  const params = useLocalSearchParams();

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

      <Details />

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          R${' '}
          <Text style={styles.footerPrice}>
            120,00
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