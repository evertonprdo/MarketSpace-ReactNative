import { FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Card } from "@/components/Card";
import { Select } from "@/components/Select";
import { PressableIcon } from "@/components/PressableIcon";
import { Header } from "@/components/Header";
import { router } from "expo-router";

const screenPadding = 24
const listColumnGap = 20

export default function UserAds() {
  const WindowDimension = useWindowDimensions();

  const cardMaxWidth = (WindowDimension.width / 2) - screenPadding - (listColumnGap / 2)

  return (
    <View style={styles.container}>
      <Header
        title="Meus anúncios"
        rightIcon={({ tint, size }) => (
          <PressableIcon
            icon={Plus}
            size={size}
            fill={tint}
            onPress={() => router.navigate('/user-ad/create')}
          />
        )}
        style={styles.header}
      />

      <View style={styles.options}>
        <Text style={styles.optionsTitle}>9 anúncios</Text>

        <Select selected={'all'} onChangeSelected={() => null}>
          <Select.Option name="all">Todos</Select.Option>
          <Select.Option name="active">Ativos</Select.Option>
          <Select.Option name="inactive">Inativos</Select.Option>
        </Select>
      </View>

      <FlatList
        key={1}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={item => String(item)}
        renderItem={() => <Card title="Tênis vermelho" price="59,90" isNewProduct style={{ maxWidth: cardMaxWidth }} />}
        numColumns={2}
        columnWrapperStyle={{ gap: listColumnGap }}
        contentContainerStyle={{ gap: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding
  },

  header: {
    marginBottom: 8
  },

  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 20,

    zIndex: 30
  },

  optionsTitle: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[200]
  }
})