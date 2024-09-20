import type { GetProductsResponse, PaymentMethods, PostImageProps, PostProductRequest } from "@/dtos/productsDTO"
import { api } from "./api"

type PostProductResponse = Omit<PostProductRequest, 'payment_methods'> & {
  id: string,
  user_id: string
}

export type PostProductImagesRequest = {
  product_id: string
  images: PostImageProps[]
}

export type GetProductsParams = {
  query?: string
  accept_trade?: boolean
  is_new?: boolean
  payment_methods?: PaymentMethods[]
}

const prefix = '/products'

export async function postProduct(newProduct: PostProductRequest) {
  try {
    const { data } = await api.post<PostProductResponse>(prefix, newProduct)

    if (!(data && data.id)) {
      throw new Error
    }

    return data

  } catch (error) {
    throw error
  }
}

export async function postProductImages({ images, product_id }: PostProductImagesRequest) {
  try {
    const productImagesForm = new FormData()

    productImagesForm.append("product_id", product_id)

    images.forEach(img => productImagesForm.append("images", img as unknown as Blob))

    api.post(`${prefix}/images`, productImagesForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  } catch (error) {
    throw error
  }
}

export async function getProducts(params?: GetProductsParams) {
  try {
    const { data } = await api.get<GetProductsResponse>(prefix, { params })

    return data

  } catch (error) {
    throw error
  }
}