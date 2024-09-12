import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ImageCarrosel } from "./ImageCarrosel";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import CreditCard from "@/assets/icons/CreditCard";
import Barcode from "@/assets/icons/Barcode";
import QrCode from "@/assets/icons/QrCode";
import Money from "@/assets/icons/Money";
import Bank from "@/assets/icons/Bank";

import ImageProfile from "@/assets/profilePhoto.jpeg"

type Props = {
  children?: React.ReactNode
  tempProp?: boolean
}

const testArray = [
  'https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg',
  'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://img-cdn.pixlr.com/image-generator/history/65ba5701b4f4f4419f746bc3/806ecb58-167c-4d20-b658-a6a6b2f221e9/medium.webp'
]

export function Details({ children, tempProp }: Props) {
  const paymentArray = [
    { icon: Barcode, title: 'Boleto' },
    { icon: QrCode, title: 'Pix' },
    { icon: Money, title: 'Dinheiro' },
    { icon: CreditCard, title: 'Cartão de Crédito' },
    { icon: Bank, title: 'Deposito Bancário' },
  ]

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ImageCarrosel
        imagesUri={testArray}
        disabledAd={tempProp}
      />

      <View style={styles.info}>

        <View style={styles.user}>
          <Image source={ImageProfile} style={styles.avatar} />
          <Text style={styles.username}>Makenna Baptista</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.tag}>Novo</Text>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bicicleta</Text>

            <Text style={styles.price}>R${' '}
              <Text style={styles.priceValue}>120,00</Text>
            </Text>
          </View>

          <Text style={styles.descText}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
          </Text>
        </View>

        <View style={styles.adTags}>

          <View style={styles.line}>
            <Text style={styles.subTitle}>Aceita Troca?</Text>
            <Text style={styles.text}>Sim</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.subTitle}>Meios de pagamento</Text>

            <View style={styles.paymentBox}>
              {paymentArray.map(({ icon: Icon, title }) => (
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