import { FlatList, useWindowDimensions } from "react-native";
import { Card } from "@/components/Card";

type Props = {
  ListHeaderComponent?: React.ReactElement<any>
}

const screenPadding = 24
const listColumnGap = 20

export function List({ ListHeaderComponent }: Props) {
  const WindowDimension = useWindowDimensions();

  const cardMaxWidth = (WindowDimension.width / 2) - screenPadding - (listColumnGap / 2)

  return (
    <FlatList
      key={1}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      keyExtractor={item => String(item)}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={() => (
        <Card
          title="Tênis vermelho"
          price="59,90"
          isNewProduct
          style={{ maxWidth: cardMaxWidth }}
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ gap: listColumnGap }}
      contentContainerStyle={{ gap: 24, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    />
  )
}