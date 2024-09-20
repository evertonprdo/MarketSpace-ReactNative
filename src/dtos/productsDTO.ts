export type ProductCommonResponseProps = {
  name: string,
  price: number,
  is_new: boolean,
  accept_trade: boolean,
}

export type PaymentMethods = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'

export type GetProductsResponse = {
  id: string,
  payment_methods: {
    key: PaymentMethods
    name: string
  }[]
  product_images: {
    path: string,
    id: string
  }[]
  user: {
    avatar: string
  }
} & ProductCommonResponseProps

export type PostProductRequest = {
  description: string,
  payment_methods: PaymentMethods[]
} & ProductCommonResponseProps

export type PostImageProps = {
  name: string
  uri: string
  type: string
}