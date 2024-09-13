import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

import ArrowRight from "@/assets/icons/ArrowRight";
import TagRegular from "@/assets/icons/TagRegular";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

type Props = PressableProps & {
  count: number
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const animConfig = {
  duration: 128,
  easing: Easing.out(Easing.poly(4)),
}

export function InfoCard({ count, onPress, ...props }: Props) {
  const scale = useSharedValue(1)

  function handleOnPress(event: GestureResponderEvent) {
    scale.value = withSequence(
      withTiming(0.93, animConfig),
      withTiming(1),
    )

    if (onPress) setTimeout(() => onPress(event), 100)
  }

  return (
    <View style={styles.info}>
      <View style={styles.infoActive}>
        <TagRegular height={22} width={22} fill={Colors.blue} />

        <View>
          <Text style={styles.counterTitle}>
            {count}
          </Text>

          <Text style={styles.counterText}>
            anúncios ativos
          </Text>
        </View>

      </View>

      <AnimatedPressable
        style={[styles.link, { transform: [{ scale }] }]}
        onPress={handleOnPress}
        hitSlop={8}
        {...props}
      >
        <Animated.Text style={styles.linkText}>
          Meus anúncios
        </Animated.Text>

        <ArrowRight height={22} width={22} fill={Colors.blue} />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    gap: 16,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 20,

    backgroundColor: "#647AC719",
    borderRadius: 6,
  },

  infoActive: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },

  counterTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl,
    color: Colors.gray[200]
  },
  counterText: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.sm,
    color: Colors.gray[200],
  },

  link: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },

  linkText: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.sm,
    color: Colors.blue
  },
})