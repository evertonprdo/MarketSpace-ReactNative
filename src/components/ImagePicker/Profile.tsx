import { Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as ImgPicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import User from "@/assets/icons/User";
import PencilSimpleLine from "@/assets/icons/PencilSimpleLine";

import Colors from "@/constants/Color";

export type ImagePickerImgProps = {
  name: string
  uri: string
  type: string
}

type Props = Omit<ViewProps, 'children'> & {
  image: ImagePickerImgProps | null
  onImageChange: (img: ImagePickerImgProps) => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const animConfig = {
  duration: 150,
  easing: Easing.out(Easing.poly(4)),
}

export function ImagePickerProfile({ image, onImageChange, ...props }: Props) {
  const isPressedIn = useSharedValue(false);

  const animStyle = useAnimatedStyle(() => ({
    backgroundColor: isPressedIn.value
      ? withTiming(Colors.blue, animConfig)
      : withTiming(Colors.blueLight, animConfig)
  }))

  async function handleUserPhotoSelect() {
    try {
      const response = await ImgPicker.launchImageLibraryAsync({
        mediaTypes: ImgPicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [1, 1],
        allowsEditing: true,
      })

      if (response.canceled) return
      if (!response.assets[0].uri) throw new Error("Algo deu errado tente novamente!")

      const { uri, type } = response.assets[0]
      const photoInfo = await FileSystem.getInfoAsync(uri)

      if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) {
        throw new Error("Imagem maior do que 3MB!")
      }

      const fileExtension = uri.split('.').pop();

      onImageChange({
        name: `user-photo.${fileExtension}`.toLocaleLowerCase(),
        uri: uri,
        type: `${type}/${fileExtension}`
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View {...props}>
      <View style={styles.photoContainer}>
        {image
          ? <Image source={{ uri: image.uri }} style={styles.sizeFull} resizeMode="cover" />
          : <User height={48} width={48} fill={Colors.gray[400]} />
        }
      </View>

      <AnimatedPressable
        style={[styles.btn, animStyle]}
        onPressIn={() => isPressedIn.value = true}
        onPressOut={() => isPressedIn.value = false}
        onPress={handleUserPhotoSelect}
      >
        <PencilSimpleLine width={16} height={16} fill={Colors.gray[600]} />
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    height: 88,
    width: 88,

    backgroundColor: Colors.gray[500],

    borderColor: Colors.blueLight,
    borderRadius: 999,
    borderWidth: 3,

    overflow: 'hidden',
  },

  sizeFull: {
    height: '100%',
    width: '100%'
  },

  btn: {
    position: 'absolute',

    padding: 12,
    bottom: 0,
    left: 56,

    borderRadius: 999,
  },
})