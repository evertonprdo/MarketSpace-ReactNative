import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View, ViewProps } from "react-native";

import Colors from "@/constants/Color";
import Fonts from "@/constants/Fonts";

type ProductCarroselProsp = ViewProps & {
  images: { uri: string }[],
  disabledAd?: boolean
}
export function Carrosel({ images, disabledAd, ...props }: ProductCarroselProsp) {
  const [currentView, setCurrentView] = useState("")
  const { width } = useWindowDimensions();

  const bgBadgeColors = [`${Colors.gray[700]}BF`, `${Colors.gray[700]}80`]

  return (
    <View style={styles.container} {...props}>
      <FlatList
        data={images}
        keyExtractor={item => item.uri}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: width,
              backgroundColor: Colors.gray[300]
            }}
            resizeMode="cover"
          />
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems }) => {
          setCurrentView(viewableItems[0].key.toString())
        }}
        pagingEnabled
        horizontal
      />

      <View style={styles.slider}>

        {images.map(item => (
          <View
            key={item.uri}
            style={[styles.sliderItem, {
              backgroundColor: item.uri === currentView
                ? bgBadgeColors[0]
                : bgBadgeColors[1]
            }]}
          />
        ))}
      </View>

      {disabledAd &&
        <View style={styles.disable}>
          <Text style={styles.disableText}>
            Anúncio desativado
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
  },

  slider: {
    padding: 2,
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    gap: 2,
    bottom: 0
  },

  sliderItem: {
    flex: 1,
    minHeight: 3,
    maxHeight: 3,
    borderRadius: 999
  },

  disable: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: `${Colors.gray[100]}99`,
    color: '#5b6633'
  },

  disableText: {
    fontFamily: Fonts.FontFamily.bold,
    fontSize: Fonts.FontSize.md,
    color: Colors.gray[700],

    textTransform: 'uppercase',
  }
})