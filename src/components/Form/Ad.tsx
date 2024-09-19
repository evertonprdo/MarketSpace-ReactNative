import { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { ImagePickerAd } from "@/components/ImagePicker/Ad";
import { Checkable } from "@/components/base/Checkable";
import { Toggle } from "@/components/base/Toggle";

import { FormInput } from "@/components/Form/Input";
import { TextErr } from "@/components/Form/TextErr";
import { FormPaymentSection } from "@/components/Form/PaymentSection";

// 1000,00 || 1.000,00 || 1000
const brMonetaryRegExp = /^(?:\d{1,3}(?:\.\d{3})*|\d+)(?:,\d{2})?$/

const adFormSchema = z.object({
  images: z.array(
    z.object({
      name: z.string().default('ad-image.unknow'),
      uri: z.string(),
      type: z.string().default('unknow')
    })
  ).min(1, { message: 'Envie pelo menos uma imagem' }),
  name: z
    .string({ required_error: 'Preencha o nome' }).trim()
    .min(1, { message: 'Preencha o nome' })
    .min(3, { message: 'O campo deve ter no mínimo 3 dígitos' }),
  description: z
    .string({ required_error: 'Preencha a descrição' }).trim()
    .min(1, { message: 'Preencha a descrição' })
    .min(8, { message: 'O campo deve ter no mínimo 8 dígitos' }),
  is_new: z
    .boolean({ message: 'Selecione uma das opções' }),
  price: z
    .string({ required_error: 'Digite o valor' }).trim()
    .regex(brMonetaryRegExp, { message: 'Valor inválido' }),
  accept_trade: z
    .boolean(),
  payment_methods: z.array(
    z.enum(['pix', 'card', 'boleto', 'cash', 'deposit'])
  ).min(1, { message: 'Selecione pelo menos uma forma de pagamento' })
})

export type FormAdProps = z.infer<typeof adFormSchema>

export type FormAdRef = { submitForm: () => void }

type Props = {
  onSubmit: (data: FormAdProps) => void
  initValues?: Omit<FormAdProps, 'images'> & {
    images: { uri: string }[]
  }
}

export const FormAd = forwardRef<FormAdRef, Props>(({ onSubmit, initValues: initialValues }, ref) => {
  const { control, handleSubmit } = useForm<FormAdProps>({
    defaultValues: initialValues ?? {
      images: [],
      accept_trade: false,
      payment_methods: []
    },
    resolver: zodResolver(adFormSchema),
  })

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit)
  }));

  return (
    <View style={styles.body}>

      <View style={styles.section}>

        <View style={styles.imageHeader}>
          <Text style={styles.title}>Imagens</Text>
          <Text style={styles.infoText}>
            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
          </Text>
        </View>

        <Controller
          control={control}
          name="images"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ImagePickerAd
              images={value}
              onImagesChange={onChange}
              messageError={error?.message}
            />
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Sobre o produto</Text>

        <FormInput
          control={control}
          name="name"
          placeholder="Título do anúncio"
        />

        <FormInput
          control={control}
          name="description"
          placeholder="Descrição do produto"
          textAlignVertical="top"
          numberOfLines={8}
          multiline
        />

        <Controller
          control={control}
          name="is_new"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={styles.selection}>
              <Checkable
                label="Produto novo"
                variant="radio"
                value={value !== undefined ? value : undefined}
                onPress={() => onChange(true)}
              />
              <Checkable
                label="Produto usado"
                variant="radio"
                value={value !== undefined ? !value : undefined}
                onPress={() => onChange(false)}
              />

              {error?.message &&
                <View style={styles.absoluteErr}>
                  <TextErr>{error.message}</TextErr>
                </View>
              }
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Venda</Text>

        <FormInput
          control={control}
          name="price"
          placeholder="Valor do produto"
          childDisplacement="left"
          keyboardType="numeric"
        >
          <Text style={styles.currency}>R$</Text>
        </FormInput>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aceita troca?</Text>

        <Controller
          control={control}
          name="accept_trade"
          render={({ field: { value, onChange } }) => (
            <Toggle
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Aceita troca?</Text>

        <FormPaymentSection
          control={control}
          name="payment_methods"
        />
      </View>

    </View>
  )
})

const styles = StyleSheet.create({
  body: { gap: 32 },
  section: { gap: 16 },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[200],
  },

  imageHeader: { gap: 4 },

  infoText: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[300],
  },

  imgPicker: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 100,
    height: 100,

    backgroundColor: Colors.gray[500],
    borderRadius: 6,
  },

  selection: {
    flexDirection: 'row',
    gap: 20
  },

  payment: { gap: 8 },

  currency: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[100]
  },

  absoluteErr: {
    position: 'absolute',

    bottom: -16,
    left: 0
  }
})