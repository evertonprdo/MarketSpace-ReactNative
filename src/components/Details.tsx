import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import CreditCard from "@/assets/icons/CreditCard";
import Barcode from "@/assets/icons/Barcode";
import QrCode from "@/assets/icons/QrCode";
import Money from "@/assets/icons/Money";
import Bank from "@/assets/icons/Bank";

import { Carrosel } from "@/components/Carrosel";

import { GetProductByIdResponse } from "@/services/products";
import { PaymentMethodsPtBrNames, PaymentMethodsResponse } from "@/dtos/productsDTO";

type PaymentNamesProps = {
  [key: string]: PaymentMethodsPtBrNames
}

export type ProductDetailsProps = {
  user: {
    name: string
    avatar: string
  }
  price: string
  images: {
    uri: string
  }[]
  is_active?: boolean
} & Omit<GetProductByIdResponse,
  'price' | 'user_id' | 'id' | 'product_images' | 'user' | 'is_active'
>

type Props = {
  product: ProductDetailsProps
  children?: React.ReactNode
}

const PaymentIcons = {
  boleto: Barcode,
  pix: QrCode,
  cash: Money,
  card: CreditCard,
  deposit: Bank,
}

export const PaymentNames: PaymentNamesProps = {
  boleto: 'Boleto',
  pix: 'Pix',
  cash: 'Dinheiro',
  card: 'Cartão de Crédito',
  deposit: 'Depósito Bancário',
}

export function Details({ product, children }: Props) {
  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Carrosel
        images={product.images}
        disabledAd={product.is_active === undefined ? false : !product.is_active}
      />

      <View style={styles.info}>

        <View style={styles.user}>
          <Image source={{ uri: product.user.avatar }} style={styles.avatar} />

          <Text style={styles.username}>
            {product.user.name}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.tag}>
            {product.is_new ? 'Novo' : 'Usado'}
          </Text>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {product.name}
            </Text>

            <Text style={styles.price}>R${' '}
              <Text style={styles.priceValue}>
                {product.price}
              </Text>
            </Text>
          </View>

          <Text style={styles.descText}>
            {product.description}
          </Text>
        </View>

        <View style={styles.adTags}>

          <View style={styles.line}>
            <Text style={styles.subTitle}>Aceita Troca?</Text>

            <Text style={styles.text}>
              {product.accept_trade ? 'Sim' : 'Não'}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.subTitle}>Meios de pagamento</Text>

            <View style={styles.paymentBox}>
              <PaymentSection
                payment_methods={product.payment_methods}
              />
            </View>

          </View>
        </View>

        {children}
      </View>
    </ScrollView>
  )
}

function PaymentSection({ payment_methods }: PaymentMethodsResponse) {
  return payment_methods.map(({ key, name }) => {
    const Icon = PaymentIcons[key]

    return (
      <View style={styles.line} key={key}>
        <Icon
          fill={Colors.gray[200]}
          height={18}
          width={18}
        />
        <Text style={styles.text}>
          {name}
        </Text>
      </View>
    )
  })
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
    flex: 1,
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