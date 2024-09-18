import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Input } from "@/components/base/Input";

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  onChangeTextCallback?: (text: string) => void
} & Omit<TextInputProps, 'value' | 'onChangeText'>

function FormInputInner<T extends FieldValues>(
  { control, name, onChangeTextCallback, children, ...props }: Props<T>,
  ref: React.ForwardedRef<TextInput>
) {

  function handleOnChangeText(text: string, onChange: (...event: any[]) => void) {
    if (onChangeTextCallback) {
      onChange(onChangeTextCallback(text))
      return
    }
    onChange(text)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error }, field: { value, onChange } }) => (
        <Input
          value={value}
          onChangeText={(text) => handleOnChangeText(text, onChange)}
          errorMessage={error?.message}
          ref={ref}
          {...props}
        >
          {children}
        </Input>
      )}
    />
  )
}

export const FormInput = forwardRef(FormInputInner) as <T extends FieldValues>(
  props: Props<T>
  & {ref?: React.ForwardedRef<TextInput>}
) => ReturnType<typeof FormInputInner>