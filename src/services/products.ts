import type { GetProductsResponse, PaymentMethods, PaymentMethodsResponse, PostImageProps, PostProductRequest, ProductCommonResponseProps, ProductImageResponse } from "@/dtos/productsDTO"
import { api } from "./api"
import { UserDTO } from "@/dtos/userDTO"

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

export type GetProductByIdResponse = {
  id: string
  user: Omit<UserDTO, 'id'>
  description: string
  is_active: boolean
  user_id: string
} & ProductCommonResponseProps
  & PaymentMethodsResponse
  & ProductImageResponse

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
    const { data } = await api.get<GetProductsResponse[]>(prefix, { params })
    return data

  } catch (error) {
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await api.get<GetProductByIdResponse>(`${prefix}/${id}`)

    return data
    
  } catch (error) {
    throw error
  }
}