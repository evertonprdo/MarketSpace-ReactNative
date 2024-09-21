import { FlatList, StyleProp, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";

import { formatCentsToBRLCurrency } from "@/utils/dataTransform";

import { AdCard } from "@/components/AdCard";
import { Loading } from "./base/Loading";
import { EmptyComponent } from "./Empty";

import type { GetProductsResponse } from "@/dtos/productsDTO";
import { fmtValueToImageUriRequest } from "@/utils/dataTransform";

export type ListRequiredProps = {
  is_active?: boolean
} & Omit<GetProductsResponse,
  'payment_methods' | 'accept_trade'
>

type Props = {
  data: ListRequiredProps[]
  ListHeaderComponent?: React.ReactElement<React.JSXElementConstructor<any>>
  style?: StyleProp<ViewStyle>
  onPressCard?: (id: string) => void
  isFetchingProducts?: boolean
}

const screenPadding = 24
const listColumnGap = 20

export function List({ ListHeaderComponent, style, data, onPressCard, isFetchingProducts }: Props) {
  const WindowDimension = useWindowDimensions();

  const cardMaxWidth = (WindowDimension.width / 2) - screenPadding - (listColumnGap / 2)

  function handleOnPressCard(productId: string) {
    if (!onPressCard)
      return

    onPressCard(productId)
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <AdCard
          avatar={fmtValueToImageUriRequest(item.user.avatar)}
          name={item.name}
          price={formatCentsToBRLCurrency(item.price)}
          is_new={item.is_new}
          thumbnail={fmtValueToImageUriRequest(item.product_images[0].path)}
          disabled={item.is_active === undefined
            ? false
            : !item.is_active
          }
          style={{ maxWidth: cardMaxWidth }}
          onPress={() => handleOnPressCard(item.id)}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={style}
      ListEmptyComponent={
        isFetchingProducts
          ? <Loading />
          : <EmptyComponent />
      }
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