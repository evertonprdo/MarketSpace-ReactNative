import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfilePhoto from "@/assets/profilePhoto.jpeg"
import Plus from "@/assets/icons/Plus";
import TagRegular from "@/assets/icons/TagRegular";
import ArrowRight from "@/assets/icons/ArrowRight";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass";
import Sliders from "@/assets/icons/Sliders";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import { PressableIcon } from "@/components/PressableIcon";

export default function Home() {
  return (
    <FlatList
      key={1}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      keyExtractor={item => String(item)}
      ListHeaderComponent={() => (
        <View style={styles.headerContainer}>
          <SafeAreaView style={styles.header}>
            <View style={styles.user}>
              <Image
                source={ProfilePhoto}
                style={styles.avatar}
              />

              <Text style={styles.welcomeText}>Boas vindas,{" \n"}
                <Text style={styles.welcomeBold}>Maria!</Text>
              </Text>
            </View>

            <Button
              title="Criar anúncio"
              variant="black"
              icon={Plus}
              onPress={() => router.navigate('/user-ad/create')}
            />
          </SafeAreaView>

          <View style={styles.sell}>
            <Text style={styles.textSell}>
              Seus produtos anunciados para venda
            </Text>

            <View style={styles.info}>
              <View style={styles.infoActive}>
                <TagRegular height={22} width={22} fill={Colors.blue} />

                <View>
                  <Text style={styles.counterTitle}>4</Text>
                  <Text style={styles.counterText}>anúncios ativos</Text>
                </View>
              </View>

              <View style={styles.link}>
                <Text style={styles.linkText}>Meus anúncios</Text>
                <ArrowRight height={22} width={22} fill={Colors.blue} />
              </View>

            </View>
          </View>

          <View style={styles.search}>
            <Text style={styles.searchTitle}>Compre produtos variados</Text>

            <Input
              placeholder="Buscar anúncio"
            >
              <PressableIcon icon={MagnifyingGlass} size={20} stroke={Colors.gray[200]} />
              <View style={styles.divider} />
              <PressableIcon icon={Sliders} size={20} stroke={Colors.gray[200]} />
            </Input>

          </View>
        </View>
      )}
      renderItem={() => (
        <Card
          title="Tênis vermelho"
          price="59,90"
          isNewProduct
          onPress={() => router.navigate('/uuid-Ykma78sw')}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
    gap: 24,
    paddingBottom: 120
  },
  columnWrapper: { gap: 20 },

  headerContainer: { gap: 32 },
  header: { gap: 8, flexDirection: "row" },

  user: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: 'center'
  },
  avatar: {
    height: 45,
    width: 45,

    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.blueLight
  },

  welcomeText: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.lg,
    color: Colors.gray[100],
  },
  welcomeBold: {
    fontFamily: Fonts.FontFamily.bold
  },

  sell: { gap: 12 },
  textSell: {
    color: Colors.gray[300],
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
  },

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

  search: {
    gap: 12
  },
  searchTitle: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[300]
  },

  divider: {
    width: 1,
    backgroundColor: Colors.gray[400],
    height: 18
  }
})