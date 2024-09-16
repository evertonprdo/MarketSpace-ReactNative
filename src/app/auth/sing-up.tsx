import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/assets/Logo";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import { ImagePicker, ImagePickerImgProps } from "@/components/ImagePicker";
import { PasswordButton } from "@/components/PasswordButton";

import { useSession } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function SingUp() {
  const { signIn } = useSession()

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [image, setImage] = useState<ImagePickerImgProps | null>(null)
  const [form, setForm] = useState()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.header}>
        <Logo height={40} width={60} style={styles.selfCenter} />

        <Text style={styles.title}>
          Boas vindas!
        </Text>

        <Text style={styles.text}>
          Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
        </Text>
      </SafeAreaView>

      <View style={styles.body}>
        <View style={styles.section}>
          <ImagePicker
            image={image}
            onImageChange={setImage}
            style={styles.selfCenter}
          />

          <Input placeholder="Nome" />
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />

          <Input
            placeholder="Senha"
            secureTextEntry={secureTextEntry}
          >
            <PasswordButton
              secureTextEntry={secureTextEntry}
              onSecureTextEntryChange={setSecureTextEntry}
            />
          </Input>

          <Input
            placeholder="Confirmar senha"
            secureTextEntry={secureTextEntry}
          >
            <PasswordButton
              secureTextEntry={secureTextEntry}
              onSecureTextEntryChange={setSecureTextEntry}
            />
          </Input>

        </View>
        <Button title="Criar" variant="black" onPress={signIn} />
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Já tem uma conta?</Text>
        <Button title="Ir para o login" variant="gray" onPress={() => router.dismiss()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 48,
    paddingVertical: 24,
    gap: 32
  },

  header: {
    gap: 12,
  },

  selfCenter: { alignSelf: 'center' },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[100],

    textAlign: 'center'
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200],

    textAlign: 'center'
  },

  body: { gap: 24 },

  section: { gap: 16 },
})