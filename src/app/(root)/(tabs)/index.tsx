import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfilePhoto from "@/assets/profilePhoto.jpeg"
import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Search } from "@/components/Search";
import { Button } from "@/components/base/Button";
import { List } from "@/components/List";
import { InfoCard } from "@/components/InfoCard";

export default function Home() {
  return (
    <List
      data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      onPressCard={(id) => router.navigate(`/${id}`)}
      style={styles.contentContainer}
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Seus produtos anunciados para venda
            </Text>

            <InfoCard count={4} onPress={() => router.navigate('/user-ads')}/>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compre produtos variados</Text>

            <Search />
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
  },

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

  section: { gap: 12 },
  sectionTitle: {
    color: Colors.gray[300],
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
  }
})