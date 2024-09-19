import { StyleSheet, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Checkable } from "@/components/base/Checkable";
import { TextErr } from "@/components/Form/TextErr";

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

const CheckArray = [
  { name: "boleto", label: "Boleto" },
  { name: "pix", label: "Pix" },
  { name: "cash", label: "Dinheiro" },
  { name: "card", label: "Cartão de Crédito" },
  { name: "deposit", label: "Depósito Bancário" },
]

export function FormPaymentSection<T extends FieldValues>({ control, name }: Props<T>) {

  function handleOnChangeValueArray(
    values: string[],
    key: string,
    value: boolean
  ) {
    if (value) {
      return [...values, key]
    }

    return values.filter(val => val !== key)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>

          {CheckArray.map(check => (
            <Checkable
              key={check.name}
              variant="checkbox"
              label={check.label}
              value={value.includes(check.name)}
              onChangeValue={(val) => onChange(
                handleOnChangeValueArray(value, check.name, val)
              )}
            />
          ))}

          {error?.message &&
            <View style={styles.absoluteErr}>
              <TextErr>{error.message}</TextErr>
            </View>
          }
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: { gap: 8 },

  absoluteErr: {
    position: 'absolute',

    bottom: -16,
    left: 0
  }
})