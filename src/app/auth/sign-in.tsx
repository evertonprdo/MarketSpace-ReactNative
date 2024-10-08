import { useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/assets/Logo";
import LogoLetter from "@/assets/LogoLetter";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { Button } from "@/components/base/Button";
import { FormSignIn, FormSignInProps } from "@/components/Form/SignIn";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { AppError } from "@/utils/AppError";

export default function SignIn() {
  const { signIn } = useAuth();
  const Toast = useToast()

  const { height: WindowHeight } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn({ email, password }: FormSignInProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Não foi possível entrar. tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={[styles.container, { height: WindowHeight }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.background}>
          <View style={styles.content}>

            <View style={styles.header}>
              <Logo style={styles.logo} />
              <LogoLetter />

              <Text style={styles.brand}>
                Seu espaço de compra e venda
              </Text>
            </View>

            <FormSignIn
              onSubmit={handleSignIn}
              isSubmiting={isLoading}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.text}>
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar uma conta"
              variant="gray"
              onPress={() => router.navigate('/auth/sign-up')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, },

  contentContainer: { minHeight: '100%' },

  content: {
    flex: 1,
    justifyContent: 'center',

    gap: 64,
    paddingHorizontal: 48,

    backgroundColor: Colors.gray[600],

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },

  background: {
    flex: 1,
    backgroundColor: Colors.gray[700]
  },

  header: {
    alignItems: 'center',
    gap: 2,
  },

  logo: {
    marginBottom: 18
  },

  brand: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[300]
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200],
    textAlign: 'center'
  },

  footer: {
    height: '24%',
    justifyContent: 'center',

    gap: 16,
    paddingHorizontal: 48,
  },
})