import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import CreditCard from "@/assets/icons/CreditCard";
import Barcode from "@/assets/icons/Barcode";
import QrCode from "@/assets/icons/QrCode";
import Money from "@/assets/icons/Money";
import Bank from "@/assets/icons/Bank";

import ImageProfile from "@/assets/profilePhoto.jpeg"

import { Carrosel } from "@/components/Carrosel";
import { useEffect, useState } from "react";

const PaymentArray = [
  { name: 'boleto', icon: Barcode, title: 'Boleto' },
  { name: 'pix', icon: QrCode, title: 'Pix' },
  { name: 'cash', icon: Money, title: 'Dinheiro' },
  { name: 'card', icon: CreditCard, title: 'Cartão de Crédito' },
  { name: 'deposit', icon: Bank, title: 'Deposito Bancário' },
]
type PaymentMethods = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
export type DetailsObjProps = {
  user: {
    name: string
    avatar: { uri: string }
  }
  images: { uri: string }[]
  name: string
  description: string
  is_new: boolean
  price: number
  accept_trade: boolean
  payment_methods: PaymentMethods[]
}

type Props = {
  adDetails: DetailsObjProps
  disabledAd?: boolean
  children?: React.ReactNode
}

export function Details({
  adDetails: {
    user,
    images,
    name,
    description,
    is_new,
    price,
    accept_trade,
    payment_methods
  },
  disabledAd,
  children
}: Props) {
  const [RenderPaymentArray, setRenderPaymentArray] = useState<typeof PaymentArray>([])

  useEffect(() => {
    setRenderPaymentArray(PaymentArray.filter(payObj => {
      return payment_methods.includes(payObj.name as PaymentMethods)
    }))
  }, [payment_methods])

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Carrosel
        images={images}
        disabledAd={disabledAd}
      />

      <View style={styles.info}>

        <View style={styles.user}>
          <Image source={ImageProfile} style={styles.avatar} />

          <Text style={styles.username}>
            {user.name}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.tag}>
            {is_new ? 'Novo' : 'Usado'}
          </Text>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {name}
            </Text>

            <Text style={styles.price}>R${' '}
              <Text style={styles.priceValue}>
                {(price / 100).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Text>
            </Text>
          </View>

          <Text style={styles.descText}>
            {description}
          </Text>
        </View>

        <View style={styles.adTags}>

          <View style={styles.line}>
            <Text style={styles.subTitle}>Aceita Troca?</Text>

            <Text style={styles.text}>
              {accept_trade ? 'Sim' : 'Não'}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.subTitle}>Meios de pagamento</Text>

            <View style={styles.paymentBox}>
              {RenderPaymentArray.map(({ icon: Icon, title }) => (
                <View style={styles.line} key={title}>
                  <Icon
                    fill={Colors.gray[200]}
                    height={18}
                    width={18}
                  />
                  <Text style={styles.text}>
                    {title}
                  </Text>
                </View>
              ))}
            </View>

          </View>
        </View>

        {children}
      </View>
    </ScrollView>
  )
}

const text = {
  fontFamily: Fonts.FontFamily.regular,
  fontSize: Fonts.FontSize.md,
  color: Colors.gray[200],
}

const styles = StyleSheet.create({
  content: { flex: 1 },

  column: { gap: 8 },

  line: {
    flexDirection: 'row',
    gap: 8
  },

  title: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[100]
  },

  subTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200],
  },

  text: {
    ...text,
  },

  info: {
    gap: 24,
    padding: 24
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  avatar: {
    width: 24,
    height: 24,

    borderColor: Colors.blueLight,
    borderRadius: 999,
    borderWidth: 2,
  },

  username: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[100]
  },

  tag: {
    alignSelf: 'flex-start',

    paddingHorizontal: 8,
    paddingVertical: 2,

    backgroundColor: Colors.gray[500],
    borderRadius: 999,

    fontFamily: Fonts.FontFamily.bold,
    fontSize: 10,
    color: Colors.gray[200],
    textTransform: 'uppercase',
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  price: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.blueLight
  },

  priceValue: { fontSize: Fonts.FontSize.xl },

  descText: {
    ...text,
    lineHeight: Fonts.FontSize.md * 1.3,
    textAlign: 'justify',
  },

  adTags: { gap: 16 },
  paymentBox: { gap: 4 },
})