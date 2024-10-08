import { useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/assets/Logo";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { Button } from "@/components/base/Button";
import { FormSignUp, FormSignUpProps } from "@/components/Form/SignUp";
import { Alert } from "@/components/base/Alert";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { AppError } from "@/utils/AppError";

import { postUser } from "@/services/users";

export default function SignUp() {
  const { signIn } = useAuth()
  const Toast = useToast()

  const [warning, setWarning] = useState({
    title: '',
    message: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignUp(data: FormSignUpProps) {
    if (data.password !== data.password_confirm) {
      setWarning({
        title: 'Confirmar senha',
        message: 'O campo senha deve ter uma correspondencia exata com o campo confirmar senha'
      })
      setShowModal(true)
      return
    }

    if (data.avatar === null) {
      setWarning({
        title: 'Imagem de perfil',
        message: 'A foto de perfil é obrigatória pois o recurso de editar foto de perfil não está disponivel na aplicação'
      })
      setShowModal(true)
      return
    }

    try {
      setIsLoading(true)

      const fmtPhone = `+55${data.tel.replace(/\D/g, '')}`

      await postUser({
        ...data,
        avatar: data.avatar,
        tel: fmtPhone
      })
      await signIn(data.email, data.password)

    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Erro ao cadastrar sua conta, tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)
      setIsLoading(false)
    }
  }

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

      <FormSignUp
        onSubmit={handleSignUp}
        isSubmiting={isLoading}
      />

      <View style={styles.section}>
        <Text style={styles.text}>Já tem uma conta?</Text>
        <Button
          title="Ir para o login"
          variant="gray"
          onPress={() => router.back()}
        />
      </View>

      <Alert
        visible={showModal}
        title={warning.title}
        message={warning.message}
        onConfirm={() => setShowModal(false)}
      />
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