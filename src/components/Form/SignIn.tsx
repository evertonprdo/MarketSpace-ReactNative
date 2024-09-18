import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { PasswordButton } from "@/components/PasswordButton";
import { Button } from "@/components/base/Button";
import { FormInput } from "@/components/Form/Input";

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Informe o e-mail' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string({ required_error: 'Informe a senha' })
    .min(6, { message: 'A senha deve ter pelo menos 6 dígitos' })
})

export type FormSignInProps = z.infer<typeof signInSchema>

type Props = {
  onSubmit: (data: FormSignInProps) => void
}

export function FormSignIn({ onSubmit }: Props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const IptRefs = useRef<TextInput>(null)

  const { control, handleSubmit, reset } = useForm<FormSignInProps>({
    resolver: zodResolver(signInSchema)
  });

  useFocusEffect(useCallback(() => { reset() }, []))

  return (
    <View style={styles.container}>
      <View style={styles.iptSection}>
        <Text style={styles.text}>
          Acesse sua conta
        </Text>

        <FormInput
          control={control}
          name="email"
          placeholder="E-mail"
          onSubmitEditing={() => IptRefs.current?.focus()}
          enterKeyHint="next"
        />

        <FormInput
          control={control}
          name="password"
          placeholder="Senha"
          ref={IptRefs}
          onSubmitEditing={handleSubmit(onSubmit)}
          enterKeyHint="next"
          secureTextEntry={secureTextEntry}
        >
          <PasswordButton
            secureTextEntry={secureTextEntry}
            onSecureTextEntryChange={setSecureTextEntry}
          />
        </FormInput>
      </View>

      <Button
        title="Entrar"
        variant="blue"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 32 },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200],
    textAlign: 'center'
  },

  iptSection: {
    gap: 16
  },
})