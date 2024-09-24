import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import ArrowLeft from "@/assets/icons/ArrowLeft";
import PencilSimpleLine from "@/assets/icons/PencilSimpleLine";
import Power from "@/assets/icons/Power";
import Trash from "@/assets/icons/Trash";

import Fonts from "@/constants/Fonts";

import { Details, ProductDetailsProps } from "@/components/Details";
import { PressableIcon } from "@/components/base/PressableIcon";
import { MessageBox } from "@/components/MessageBox";
import { Loading } from "@/components/base/Loading";
import { Button } from "@/components/base/Button";
import { Modal } from "@/components/base/Modal";
import { Header } from "@/components/Header";

import { fmtValueToImageUriRequest, formatCentsToBRLCurrency } from "@/utils/dataTransform";
import { deleteProduct, getProductById, patchProductActiveStatus } from "@/services/products";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/hooks/useToast";

enum MODAL {
  NONE = 0,
  PATCH_MESSAGE = 1,
  DELETE_MESSAGE = 2
}

export default function UserAdDetails() {
  const params = useLocalSearchParams();
  const productId = params.id as string

  const Toast = useToast()

  const [product, setProduct] = useState<ProductDetailsProps>()
  const [isFetchingProduct, setIsFetchingProduct] = useState(true)

  const [showModal, setShowModal] = useState(MODAL.NONE)

  async function handleConfirmPatchProduct() {
    try {
      await patchProductActiveStatus(productId, !product?.is_active)

      fetchProduct();

      Toast.showToast('Anúncio atualizado com sucesso', 'green')

    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Não foi possível atualizar o produto, tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)
    } finally {
      setShowModal(MODAL.NONE)
    }
  }

  async function fetchProduct() {
    try {
      setIsFetchingProduct(true)
      const { product_images, user, price, ...data } = await getProductById(productId)

      const images = product_images.map(img => ({
        uri: fmtValueToImageUriRequest(img.path)
      }))

      setProduct({
        ...data,
        images,
        user: {
          name: user.name,
          avatar: fmtValueToImageUriRequest(user.avatar),
        },
        price: formatCentsToBRLCurrency(price)
      })

    } catch (error: any) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Erro ao carregar produto. tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)
    } finally {
      setIsFetchingProduct(false)
    }
  }

  async function handleDeleteProduct() {
    try {
      await deleteProduct(productId)

      Toast.showToast('Anúncio removido com sucesso', 'green')

      router.dismissAll()

    } catch (error) {
      const isAppError = error instanceof AppError
      
      const title = isAppError ? error.message : "Não foi possível excluir o anúncio. tente novamente mais tarde."
      
      Toast.showToast(title, 'red')
      console.log(error)
      setShowModal(MODAL.NONE)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProduct()
  }, []))

  if (isFetchingProduct) return <Loading />
  if (!product) return router.back()

  return (
    <View style={styles.flex}>
      <Header
        style={styles.header}
        leftIcon={({ size, tint }) =>
          <PressableIcon
            icon={ArrowLeft}
            fill={tint}
            size={size}
            onPress={() => router.dismiss()}
          />
        }
        rightIcon={({ size, tint }) =>
          <PressableIcon
            icon={PencilSimpleLine}
            fill={tint}
            size={size}
            onPress={() => router.navigate({
              pathname: '/user-ad/edit',
              params: { id: productId }
            })}
          />
        }
      />

      <Details
        product={product}
        key={'UserProductDetails'}
      >
        <View style={styles.buttonsCotainer}>
          {product.is_active ? (
            <Button
              key={'btnGray'}
              title={'Desativar anúncio'}
              variant={'black'}
              icon={Power}
              onPress={() => setShowModal(MODAL.PATCH_MESSAGE)}
            />
          ) : (
            <Button
              key={'btnBlue'}
              title={'Reativar anúncio'}
              variant={'blue'}
              icon={Power}
              onPress={() => setShowModal(MODAL.PATCH_MESSAGE)}
            />
          )}
          <Button
            title="Excluir anúncio"
            variant="gray"
            icon={Trash}
            onPress={() => setShowModal(MODAL.DELETE_MESSAGE)}
          />
        </View>
      </Details>

      <Modal
        visible={showModal === MODAL.PATCH_MESSAGE}
        contentContainerStyle={styles.modalContentContainer}
      >
        <MessageBox
          title="Visibilidade do anúncio"
          btnVariant={{ confirm: product.is_active ? 'black' : 'blue' }}
          onCancel={() => setShowModal(MODAL.NONE)}
          onConfirm={handleConfirmPatchProduct}
        >
          Você está prestes a{' '}
          <Text style={styles.modalBold}>
            {product.is_active ? 'Desativar' : 'Reativar'}
          </Text>
          {' '}a visibilidade do seu anúncio, tem certeza que deseja fazer isso?
        </MessageBox>
      </Modal>

      <Modal
        visible={showModal === MODAL.DELETE_MESSAGE}
        contentContainerStyle={styles.modalContentContainer}
      >
        <MessageBox
          title="Exclusão do anúncio"
          btnVariant={{ confirm: 'black' }}
          onCancel={() => setShowModal(MODAL.NONE)}
          onConfirm={handleDeleteProduct}
        >
          Você está prestes a{' '}
          <Text style={styles.modalBold}>
            Excluir permanentemente
          </Text>
          {' '}o seu anúncio, tem certeza que deseja fazer isso?
        </MessageBox>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

  buttonsCotainer: {
    gap: 8
  },

  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 24
  },

  modalBold: {
    fontFamily: Fonts.FontFamily.bold,
    textTransform: 'lowercase'
  },
})