import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import Plus from "@/assets/icons/Plus";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

import { Select } from "@/components/Select";
import { PressableIcon } from "@/components/PressableIcon";
import { Header } from "@/components/Header";
import { List } from "@/components/List";

export default function UserAds() {
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

      <List
        data={[0, 1, 2, 3, 4, 5, 6]}
        onPressCard={(id) => router.navigate(`/user-ad/${id}`)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24
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