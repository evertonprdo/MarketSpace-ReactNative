import Eye from "@/assets/icons/Eye";
import TagRegular from "@/assets/icons/TagRegular";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Radio } from "@/components/Radio";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const [state, setState] = useState(false)

  return (
    <View style={styles.container}>
      <Button
        variant="black"
        title="Button"
      />
      <Button
        variant="blue"
        title="Button"
      />
      <Button
        variant="gray"
        title="Button"
        icon={TagRegular}
      />

      <Input
        placeholder="Placeholder"
      >
        <Eye width={20} height={20} />
      </Input>

      <Input
        placeholder="Placeholder"
      />

      <Radio
        label="Selection"
        isActive={state}
        onPress={() => setState(!state)}
      />
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