import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import Whatsapp from "@/assets/icons/Whatsapp";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Header } from "@/components/Header";
import { ImageCarrosel } from "@/components/ImageCarrosel";
import { PressableIcon } from "@/components/PressableIcon";
import { Button } from "@/components/Button";

export default function AdDetails() {
  const params = useLocalSearchParams();

  console.log(params)

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

      <ScrollView
        style={styles.content}
        
      >
        <ImageCarrosel
          imagesUri={testArray}
        />
      </ScrollView>

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

const testArray = [
  'https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg',
  'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp'
]

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

  content: {
    flex: 1
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