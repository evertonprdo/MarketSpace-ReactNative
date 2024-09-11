import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Checkable } from "@/components/Checkable";
import { Toggle } from "@/components/Toggle";
import { Tag } from "@/components/Tag";
import { Select } from "@/components/Select";
import { Card } from "@/components/Card";
import { router } from "expo-router";

export default function Home() {
  const [state, setState] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <View style={styles.container}>
      <Checkable
        label="Selection"
        variant="checkbox"
        value={state}
        onPress={() => setState(!state)}
      />

      <Checkable
        label="Selection"
        variant="radio"
        value={state}
        onPress={() => setState(!state)}
      />

      <Toggle
        value={state}
        onPress={() => setState(!state)}
      />

      <Tag
        label="tag"
        value={state}
        onPress={() => setState(!state)}
      />

      <Select selected={selected} onChangeSelected={setSelected}>
        <Select.Option name="all">
          Todos
        </Select.Option>

        <Select.Option name="active">
          Ativos
        </Select.Option>

        <Select.Option name="inactive">
          Inativos
        </Select.Option>
      </Select>

      <View style={{ flexDirection: "row", width: "100%", gap: 8 }}>
        <Card title="Tênis vermelho" price="59,90" isNewProduct={true} onPress={() => router.push("/hsp24xl")} />
        <Card title="Tênis vermelho" price="59,90" isNewProduct={false} isAdDisable />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16
  }
})