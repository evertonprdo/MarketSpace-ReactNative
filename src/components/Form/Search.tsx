import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Sliders from "@/assets/icons/Sliders";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass";
import X from "@/assets/icons/X";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import { PressableIcon } from "@/components/base/PressableIcon";
import { Modal } from "@/components/base/Modal";
import { Button } from "@/components/base/Button";
import { Tag } from "@/components/base/Tag";
import { Toggle } from "@/components/base/Toggle";
import { FormInput } from "@/components/Form/Input";
import { FormPaymentSection } from "@/components/Form/PaymentSection";

import { GetProductsParams } from "@/services/products";

const searchSchema = z.object({
  query: z.string().trim().optional(),
  is_new: z.array(
    z.enum(['new', 'used'])
  ).min(1),
  accept_trade: z.boolean(),
  payment_methods: z.array(
    z.enum(['pix', 'card', 'boleto', 'cash', 'deposit'])
  ).min(1, { message: 'Selecione pelo menos uma forma de pagamento' })
})

type SearchParams = z.infer<typeof searchSchema>

type Props = {
  onSubmit: (params: GetProductsParams) => void
}

export function Search({ onSubmit }: Props) {
  const [showModal, setShowModal] = useState(false)

  const { control, handleSubmit, reset } = useForm<SearchParams>({
    defaultValues: {
      query: '',
      is_new: ['new', 'used'],
      accept_trade: false,
      payment_methods: ['pix', 'card', 'boleto', 'cash', 'deposit']
    },
    resolver: zodResolver(searchSchema),
  })

  function handleOnChangeTagValue(
    key: 'new' | 'used',
    val: boolean,
    value: ('new' | 'used')[],
    onChange: (val: ('new' | 'used')[]) => void
  ) {
    if (val && !value.includes(key)) {
      onChange([...value, key])
    }

    if (!val && value.length > 1) {
      onChange(value.filter(item => item !== key))
    }
  }

  function handleFormSubmit(data: SearchParams) {
    const is_new = data.is_new.length === 2
      ? undefined
      : data.is_new.includes('new')

    onSubmit({
      ...data,
      accept_trade: data.accept_trade ? true : undefined,
      is_new,
    })
    setShowModal(false)
  }

  return (
    <>
      <FormInput
        control={control}
        name="query"
        placeholder="Buscar anúncio"
        onSubmitEditing={handleSubmit(handleFormSubmit)}
        enterKeyHint="search"
      >
        <PressableIcon
          icon={MagnifyingGlass}
          size={20}
          stroke={Colors.gray[200]}
          onPress={handleSubmit(handleFormSubmit)}
        />

        <View style={styles.divider} />

        <PressableIcon
          icon={Sliders}
          size={20}
          stroke={Colors.gray[200]}
          onPress={() => setShowModal(true)}
        />
      </FormInput>

      <Modal
        visible={showModal}
        contentContainerStyle={styles.modalContentContainer}
      >
        <Animated.View
          style={styles.content}
          entering={SlideInDown.delay(150).duration(750)}
        >

          <View style={styles.itens}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Filtrar anúncios</Text>

              <PressableIcon
                icon={X}
                size={24}
                fill={Colors.gray[400]}
                onPress={() => setShowModal(false)}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Condição</Text>

              <View style={styles.optsCondition}>
                <Controller
                  control={control}
                  name="is_new"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <Tag
                        label="Novo"
                        value={value.includes('new')}
                        onValueChange={(val) => handleOnChangeTagValue('new', val, value, onChange)}
                      />
                      <Tag
                        label="Usado"
                        value={value.includes('used')}
                        onValueChange={(val) => handleOnChangeTagValue('used', val, value, onChange)}
                      />
                    </>
                  )}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Aceita troca?</Text>

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
              <Text style={styles.sectionTitle}>Meios de pagamento aceitos</Text>

              <FormPaymentSection
                control={control}
                name="payment_methods"
              />
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="Resetar filtros"
              variant="gray"
              style={styles.button}
              onPress={() => reset()}
            />
            <Button
              title="Aplicar filtros"
              variant="black"
              style={styles.button}
              onPress={handleSubmit(handleFormSubmit)}
            />
          </View>

        </Animated.View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    width: 1,
    backgroundColor: Colors.gray[400],
    height: 18
  },

  modalContentContainer: {
    justifyContent: 'flex-end',
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 48,
    gap: 64,

    backgroundColor: Colors.gray[600],

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    elevation: 30,

    shadowOpacity: 0.1,
    shadowOffset: { height: -20, width: 0 },
    shadowRadius: 30,
  },

  itens: { gap: 24 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  headerTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[100]
  },

  section: { gap: 12 },

  sectionTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200]
  },

  optsCondition: {
    flexDirection: 'row',
    gap: 8
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  button: { flex: 1 },
})