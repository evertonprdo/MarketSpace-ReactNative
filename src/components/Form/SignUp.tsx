import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import { PasswordButton } from "@/components/PasswordButton";
import { Button } from "@/components/base/Button";
import { ImagePickerProfile } from "@/components/ImagePicker/Profile";
import { FormInput } from "@/components/Form/Input";

// (XX) XXXX-XXXX || (XX) 9XXXX-XXXX
const BrazilianPhoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/ 

export const signUpSchema = z.object({
  avatar: z.object({
    name: z.string(),
    uri: z.string(),
    type: z.string(),
  }).nullable(),
  name: z
    .string({ required_error: 'Informe o nome' }).trim()
    .min(1, { message: 'Informe o nome' })
    .min(3, { message: 'O nome deve ter pelo menos 3 dígitos' }),
  email: z
    .string({ required_error: 'Informe o e-mail' }).trim()
    .min(1, { message: "Informe o e-mail" })
    .email({ message: 'E-mail inválido' }),
  tel: z
    .string({ required_error: 'Informe o telefone' }).trim()
    .min(1, { message: 'Informe o telefone' })
    .regex(BrazilianPhoneRegExp, { message: 'Telefone inválido' }),
  password: z
    .string({ required_error: 'Informe a senha' }).trim()
    .min(6, { message: 'A senha deve ter pelo menos 6 dígitos' }),
  password_confirm: z
    .string({ required_error: 'Informe a confirmação da senha' }).trim()
    .min(6, { message: 'A senha deve ter pelo menos 6 dígitos' }),
})

export type FormSignUpProps = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: FormSignUpProps) => void
  isSubmiting?: boolean
}

export function FormSignUp({ onSubmit, isSubmiting }: Props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const IptRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ]

  const { control, handleSubmit } = useForm<FormSignUpProps>({
    defaultValues: { avatar: null },
    resolver: zodResolver(signUpSchema),
  });

  function handleOnChagePhoneInput(text: string) {
    text = text.replace(/\D/g, '');

    if (text.length > 0) {
      text = '(' + text;
    }
    if (text.length > 3) {
      text = text.slice(0, 3) + ') ' + text.slice(3);
    }

    const isCellPhone = text[5] === '9'
    const hyfenPosition = isCellPhone ? 10 : 9
    const maxLenght = isCellPhone ? 15 : 14

    if (text.length > hyfenPosition) {
      text = text.slice(0, hyfenPosition) + '-' + text.slice(hyfenPosition, 14);
    }

    return text = text.slice(0, maxLenght)
  }

  return (
    <View style={styles.section}>
      <Controller
        control={control}
        name="avatar"
        render={({ field: { onChange, value } }) => (
          <ImagePickerProfile
            image={value ?? null}
            onImageChange={onChange}
            style={styles.selfCenter}
          />
        )}
      />

      <FormInput
        control={control}
        name="name"
        placeholder="Nome"
        onSubmitEditing={() => IptRefs[0].current?.focus()}
        enterKeyHint="next"
      />

      <FormInput
        control={control}
        name="email"
        placeholder="E-mail"
        ref={IptRefs[0]}
        onSubmitEditing={() => IptRefs[1].current?.focus()}
        enterKeyHint="next"
      />

      <FormInput
        control={control}
        name="tel"
        placeholder="Telefone"
        onChangeTextCallback={handleOnChagePhoneInput}
        ref={IptRefs[1]}
        onSubmitEditing={() => IptRefs[2].current?.focus()}
        keyboardType="numeric"
        enterKeyHint="next"
        maxLength={15}
      />

      <FormInput
        control={control}
        name="password"
        placeholder="Senha"
        ref={IptRefs[2]}
        onSubmitEditing={() => IptRefs[3].current?.focus()}
        enterKeyHint="next"
        secureTextEntry={secureTextEntry}
      >
        <PasswordButton
          secureTextEntry={secureTextEntry}
          onSecureTextEntryChange={setSecureTextEntry}
        />
      </FormInput>

      <FormInput
        control={control}
        name="password_confirm"
        placeholder="Confirmar senha"
        onSubmitEditing={handleSubmit(onSubmit)}
        enterKeyHint="send"
        ref={IptRefs[3]}
        secureTextEntry={secureTextEntry}
      >
        <PasswordButton
          secureTextEntry={secureTextEntry}
          onSecureTextEntryChange={setSecureTextEntry}
        />
      </FormInput>

      <Button
        title="Criar"
        variant="black"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmiting}
        disabled={isSubmiting}
        style={styles.btn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  section: { gap: 16 },

  selfCenter: { alignSelf: 'center' },

  btn: { 
    minHeight: 42,
    marginTop: 8,
  },
})