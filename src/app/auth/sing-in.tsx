import { useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Logo from "@/assets/Logo";
import LogoLetter from "@/assets/LogoLetter";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { Button } from "@/components/base/Button";
import { Input } from "@/components/base/Input";

import { useSession } from "@/contexts/AuthContext";
import { PasswordButton } from "@/components/PasswordButton";

export default function SingIn() {
  const { signIn } = useSession();
  const { height: WindowHeight } = useWindowDimensions();

  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

            <View style={styles.body}>
              <View style={styles.loginSection}>
                <Text style={styles.text}>
                  Acesse sua conta
                </Text>
                <Input
                  placeholder="E-mail"
                />
                <Input
                  placeholder="Senha"
                  secureTextEntry={secureTextEntry}
                >
                  <PasswordButton
                    secureTextEntry={secureTextEntry}
                    onSecureTextEntryChange={setSecureTextEntry}
                  />
                </Input>
              </View>

              <Button
                title="Entrar"
                variant="blue"
                onPress={signIn}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.text}>
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar uma conta"
              variant="gray"
              onPress={() => router.navigate('/auth/sing-up')}
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

  body: {
    gap: 32,
  },

  loginSection: {
    gap: 16
  },

  footer: {
    height: '24%',
    justifyContent: 'center',

    gap: 16,
    paddingHorizontal: 48,
  },
})