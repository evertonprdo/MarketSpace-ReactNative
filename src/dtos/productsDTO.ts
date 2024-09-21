export type ProductCommonResponseProps = {
  name: string,
  price: number,
  is_new: boolean,
  accept_trade: boolean,
}

export type PaymentMethods = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit'
export type PaymentMethodsPtBrNames = 'Depósito Bancário' | 'Pix' | 'Dinheiro' | 'Boleto' | 'Cartão de Crédito'

export type PaymentMethodsResponse = {
  payment_methods: {
    key: PaymentMethods
    name: PaymentMethodsPtBrNames
  }[]
}

export type PostImageProps = {
  name: string
  uri: string
  type: string
}

export type ProductImageResponse = {
  product_images: {
    path: string,
    id: string
  }[]
}

export type GetProductsResponse = {
  id: string,
  user: {
    avatar: string
  }
} & ProductCommonResponseProps & ProductImageResponse & PaymentMethodsResponse

export type PostProductRequest = {
  description: string,
  payment_methods: PaymentMethods[]
} & ProductCommonResponseProps