import { StyleSheet, Text, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type IconProps = {
  tint: string,
  size: number
}

type Props = ViewProps & {
  title?: string

  leftIcon?: (props: IconProps) => React.JSX.Element
  rightIcon?: (props: IconProps) => React.JSX.Element
}

const IconColor = Colors.gray[100]
const IconSize = 24

export function Header({ title, leftIcon: LeftIcon, rightIcon: RightIcon, style, ...props }: Props) {
  return (
    <SafeAreaView style={[styles.header, style]} {...props}>

      {LeftIcon
        ? <LeftIcon tint={IconColor} size={IconSize} />
        : <View style={styles.emptyView} />
      }

      <Text style={styles.headerTitle}>
        {title}
      </Text>

      {RightIcon
        ? <RightIcon tint={IconColor} size={IconSize} />
        : <View style={styles.emptyView} />
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 24,
  },

  emptyView: {
    height: IconSize,
    width: IconSize
  },

  headerTitle: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.xl
  },
})