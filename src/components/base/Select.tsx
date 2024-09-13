import { Children, createContext, isValidElement, useContext, useEffect, useState } from "react"
import { Pressable, PressableProps, StyleSheet, Text } from "react-native"
import Animated, { Easing, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import CaretUp from "@/assets/icons/CaretUp"

import Colors from "@/constants/Color"
import Fonts from "@/constants/Fonts"

type SelectContextProps = {
  selected: string | null
  onChangeSelected: (name: string | null) => void
  showOptions: SharedValue<boolean>
}

type OptionChildProps = {
  [key: string]: React.ReactNode
}

type SelectProps = PressableProps & {
  selected: string | null
  onChangeSelected: (name: null | string) => void
  children: React.ReactNode
}

const SelectContext = createContext({} as SelectContextProps)

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const icon = { size: 16, color: Colors.gray[300] }
const optionItemHeight = 32

const animConfig = {
  duration: 450,
  easing: Easing.out(Easing.poly(4))
}

function Select({ selected, onChangeSelected, children }: SelectProps) {
  const [childrenOptions, setChildrenOptions] = useState<OptionChildProps>({})

  const showOptions = useSharedValue(false)
  const rotateX = useSharedValue(0);

  const optionsHeight = Object.values(childrenOptions).length * (optionItemHeight + 12)

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: showOptions.value
      ? withTiming(Colors.gray[400], animConfig)
      : withTiming(Colors.gray[500], animConfig),
  }))

  const animOptionsContainer = useAnimatedStyle(() => ({
    height: showOptions.value
      ? withTiming(optionsHeight, animConfig)
      : withTiming(0, animConfig)
  }))

  const animIconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` }
    ]
  }))

  function handleOnChangeShowOptions(val: boolean) {
    showOptions.value = val
    rotateX.value = val
      ? withTiming(180, animConfig)
      : withTiming(0, animConfig)
  }

  useEffect(() => {
    const childrenMap = {} as OptionChildProps

    Children.map<void, React.ReactNode>(children, child => {
      if (isValidElement(child)) {
        const name = child.props["name"]
        const optionChildren = child.props["children"]

        childrenMap[name] = optionChildren
      }
    })

    setChildrenOptions(childrenMap)
  }, [])

  useEffect(() => {
    handleOnChangeShowOptions(false)
  }, [selected])

  return (
    <SelectContext.Provider value={{ selected, onChangeSelected, showOptions }}>

      <AnimatedPressable
        style={[styles.selectContainer, animatedStyle]}
        onPress={() => handleOnChangeShowOptions(!showOptions.value)}
        hitSlop={8}
      >
        <Text>
          {selected ? childrenOptions[selected] : "Selecione"}
        </Text>

        <Animated.View style={animIconStyle}>
          <CaretUp height={icon.size} width={icon.size} fill={icon.color} />
        </Animated.View>

        <Animated.View style={[styles.optionsContainer, animOptionsContainer]}>
          {children}
        </Animated.View>

      </AnimatedPressable>
    </SelectContext.Provider>
  )
}

type OptionProps = {
  name: string
  children: React.ReactNode
}

function Option({ name, children }: OptionProps) {
  const { selected, onChangeSelected, showOptions } = useContext(SelectContext)

  const isPressedIn = useSharedValue(false)

  const fontFamily = selected === name
    ? Fonts.FontFamily.bold
    : Fonts.FontFamily.regular

  const animStyle = useAnimatedStyle(() => ({
    opacity: showOptions.value
      ? withTiming(1, animConfig)
      : withTiming(0, animConfig),

    backgroundColor: isPressedIn.value
      ? withTiming(Colors.gray[500], animConfig)
      : withTiming("transparent", animConfig)
  }))

  return (
    <AnimatedPressable
      style={[styles.itemOption, animStyle]}
      onPress={() => onChangeSelected(name)}
      onPressIn={() => isPressedIn.value = true}
      onPressOut={() => isPressedIn.value = false}
      hitSlop={8}
    >

      <Text style={[styles.text, { fontFamily }]}>
        {children}
      </Text>
    </AnimatedPressable>
  )
}

Select.Option = Option
export { Select }

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: 111,
    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 6,
    borderWidth: 1,

    zIndex: 10
  },

  text: {
    fontFamily: Fonts.FontFamily.regular,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[100]
  },

  optionsContainer: {
    position: "absolute",
    justifyContent: "space-evenly",
    overflow: "hidden",

    paddingHorizontal: 6,
    borderRadius: 6,

    top: 40,
    right: 0,
    left: 0,

    backgroundColor: Colors.gray[700],

    elevation: 3,

    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.1
  },

  itemOption: {
    height: optionItemHeight,
    borderRadius: 6,
    paddingHorizontal: 6,
    justifyContent: "center"
  }
})