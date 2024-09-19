import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { BounceIn, LinearTransition } from "react-native-reanimated";
import * as ImgPicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import Plus from "@/assets/icons/Plus";
import X from "@/assets/icons/X";

import Colors from "@/constants/Color";
import { ImagePickerImgProps } from "@/components/ImagePicker/Profile";
import { TextErr } from "@/components/Form/TextErr";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type Props = {
  images: ImagePickerImgProps[],
  onImagesChange: (imgs: ImagePickerImgProps[]) => void
  messageError?: string
}

export function ImagePickerAd({ images, onImagesChange, messageError }: Props) {
  async function processImageForUpload(image: ImgPicker.ImagePickerAsset) {
    const { uri, type } = image
    const photoInfo = await FileSystem.getInfoAsync(uri)

    if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
      throw new Error("Imagem maior do que 3MB!")
    }

    const fileExtension = uri.split('.').pop();

    return {
      name: `ad-img.${fileExtension}`.toLocaleLowerCase(),
      uri: uri,
      type: `${type}/${fileExtension}`
    }
  }

  async function handleAdImgSelect() {
    try {
      const response = await ImgPicker.launchImageLibraryAsync({
        mediaTypes: ImgPicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [1, 1],
        allowsMultipleSelection: true,
        selectionLimit: 3 - images.length
      })

      if (response.canceled) return
      if (!response.assets[0].uri) throw new Error("Algo deu errado tente novamente!")

      const imgArray = await Promise.all(
        response.assets.map(processImageForUpload)
      )

      onImagesChange([...images, ...imgArray])

    } catch (error) {
      console.log(error)
    }
  }

  function handleRemoveImg(key: string) {
    const imgArray = images.filter(img => img.uri !== key)

    onImagesChange(imgArray)
  }

  return (
    <View style={styles.container}>

      {images.map(img => (
        <Animated.View
          key={img.uri}
          layout={LinearTransition}
          entering={BounceIn}
        >
          <Image
            source={{ uri: img.uri }}
            style={styles.imgContainer}
            resizeMode="cover"
          />

          <AnimatedPressable
            onPress={() => handleRemoveImg(img.uri)}
            style={styles.btnX}
          >
            <X height={12} width={12} fill={Colors.gray[700]} />
          </AnimatedPressable>
        </Animated.View>
      ))}

      {images.length < 3 &&
        <AnimatedPressable
          onPress={handleAdImgSelect}
          layout={LinearTransition}
          style={styles.imgContainer}
          entering={BounceIn}
        >
          <Plus height={24} width={24} fill={Colors.gray[400]} />
        </AnimatedPressable>
      }

      {messageError && (
        <View style={styles.absoluteTxtContainer}>
          <TextErr>{messageError}</TextErr>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    gap: 8
  },

  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 100,
    height: 100,

    backgroundColor: Colors.gray[500],
    borderRadius: 6,
  },

  btnX: {
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',

    top: 4,
    right: 4,

    height: 16,
    width: 16,

    backgroundColor: Colors.gray[200],
    borderRadius: 999
  },

  absoluteTxtContainer: {
    position: 'absolute',

    bottom: -16,
    left: 0
  }
})