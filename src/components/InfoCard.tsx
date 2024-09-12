import { Pressable, StyleSheet, Text, View } from "react-native";

import ArrowRight from "@/assets/icons/ArrowRight";
import TagRegular from "@/assets/icons/TagRegular";
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Color";

export function InfoCard() {
  return (
    <View style={styles.info}>
      <View style={styles.infoActive}>
        <TagRegular height={22} width={22} fill={Colors.blue} />

        <View>
          <Text style={styles.counterTitle}>4</Text>
          <Text style={styles.counterText}>anúncios ativos</Text>
        </View>
      </View>

      <Pressable style={styles.link}>
        <Text style={styles.linkText}>Meus anúncios</Text>
        <ArrowRight height={22} width={22} fill={Colors.blue} />
      </Pressable>
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