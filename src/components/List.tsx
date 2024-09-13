import { FlatList, StyleProp, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";

import { AdCard } from "@/components/AdCard";

type Props = {
  data: ArrayLike<number>
  ListHeaderComponent?: () => React.JSX.Element
  style?: StyleProp<ViewStyle>
  onPressCard?: (id: string) => void
}

const screenPadding = 24
const listColumnGap = 20

export function List({ ListHeaderComponent, style, data, onPressCard }: Props) {
  const WindowDimension = useWindowDimensions();

  const cardMaxWidth = (WindowDimension.width / 2) - screenPadding - (listColumnGap / 2)

  function handleOnPressCard() {
    if (onPressCard) {
      onPressCard("uuid-Xy7as")
    }
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => String(item)}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={() => (
        <AdCard
          title="Tênis vermelho"
          price="59,90"
          isNewProduct
          style={{ maxWidth: cardMaxWidth }}
          onPress={handleOnPressCard}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={style}
    />
  )
}

const styles = StyleSheet.create({
  columnWrapper: { gap: listColumnGap },
  contentContainer: {
    gap: 24,
    paddingBottom: 120
  }
})