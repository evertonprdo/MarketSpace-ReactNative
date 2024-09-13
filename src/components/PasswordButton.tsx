import EyeClosed from "@/assets/icons/EyeClosed"
import Eye from "@/assets/icons/Eye"

import Colors from "@/constants/Color"

import { PressableIcon } from "@/components/base/PressableIcon"

type Props = {
  isPasswordVisible: boolean
  onPasswordVisibleChange: (val: boolean) => void
}

export function PasswordButton({ isPasswordVisible, onPasswordVisibleChange }: Props) {
  return (
    <PressableIcon
      icon={isPasswordVisible ? Eye : EyeClosed}
      size={20}
      fill={Colors.gray[300]}
      onPress={() => onPasswordVisibleChange(!isPasswordVisible)}
    />
  )
}