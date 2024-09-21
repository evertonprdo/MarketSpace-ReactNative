import { GestureResponderEvent, Image, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

import type { ProductCommonResponseProps } from "@/dtos/productsDTO";

export type CardProductProps = {
  avatar: string
  disabledProduct?: boolean
  price: string
  thumbnail: string
} & Omit<
  ProductCommonResponseProps, 'accept_trade' | 'price'
>

type Props = PressableProps & CardProductProps

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const animConfig = {
  duration: 128,
  easing: Easing.out(Easing.poly(4)),
}

export function AdCard({ onPress, is_new, disabledProduct, style, avatar, name, price, thumbnail, ...props }: Props) {
  const scale = useSharedValue(1);

  const bgTagColor = is_new
    ? Colors.blue
    : Colors.gray[200]

  const descText = disabledProduct
    ? [Colors.gray[400], Fonts.FontFamily.regular]
    : [Colors.gray[200], Fonts.FontFamily.bold]

  const animStyles = useAnimatedStyle(() => ({
    transform: [{
      scale: scale.value
    }]
  }))

  function handleOnPress(event: GestureResponderEvent) {
    scale.value = withSequence(
      withTiming(0.9, animConfig),
      withTiming(1, animConfig)
    )

    if (onPress)
      setTimeout(() => onPress(event), 150);
  }

  return (
    <AnimatedPressable
      style={[styles.container, animStyles, style]}
      onPress={handleOnPress}
      {...props}
    >

      <View style={styles.banner}>
        <Image
          source={{uri: thumbnail}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.absoluteContainer}>
          <Image
            source={{uri: avatar}}
            style={styles.profileImg}
          />

          <Text style={[styles.tag, { backgroundColor: bgTagColor }]}>
            {is_new ? 'Novo' : 'Usado'}
          </Text>
        </View>

        {disabledProduct && (
          <View style={styles.disabledAdView}>
            <Text style={styles.disabledAdText}>
              Anúncio desativado
            </Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text style={[styles.title, { color: descText[0] }]}>
          {name}
        </Text>

        <Text style={[
          styles.price,
          { color: descText[0], fontFamily: descText[1] }
        ]}>
          <Text style={styles.currency}>
            R${" "}
          </Text>
          {price}
        </Text>
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },

  banner: {
    overflow: "hidden",
    borderRadius: 6
  },

  image: {
    height: 100,
    width: "100%"
  },

  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    padding: 4,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  profileImg: {
    height: 24,
    width: 24,

    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.gray[700]
  },

  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,

    color: "#FFF",
    fontFamily: Fonts.FontFamily.bold,
    fontSize: 10,
    textTransform: "uppercase",
  },

  details: {
    paddingHorizontal: 2,
  },

  title: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md
  },

  price: { fontSize: Fonts.FontSize.lg },
  currency: { fontSize: Fonts.FontSize.sm },

  disabledAdView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${Colors.gray[100]}72`,
    justifyContent: "flex-end",

    padding: 8
  },

  disabledAdText: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: 11,
    color: Colors.gray[700],
    textTransform: "uppercase"
  }
})