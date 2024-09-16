import EyeClosed from "@/assets/icons/EyeClosed"
import Eye from "@/assets/icons/Eye"

import Colors from "@/constants/Color"

import { PressableIcon } from "@/components/base/PressableIcon"

type Props = {
  secureTextEntry: boolean
  onSecureTextEntryChange: (val: boolean) => void
}

export function PasswordButton({ secureTextEntry, onSecureTextEntryChange }: Props) {
  return (
    <PressableIcon
      icon={secureTextEntry ? Eye : EyeClosed}
      size={20}
      fill={Colors.gray[300]}
      onPress={() => onSecureTextEntryChange(!secureTextEntry)}
    />
  )
}