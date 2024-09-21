import { api } from "@/services/api"

// (XX) XXXX-XXXX || (XX) 9XXXX-XXXX
export const BrazilianPhoneRegExp = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/

// 1000,00 || 1.000,00 || 1000
export const brMonetaryRegExp = /^(?:\d{1,3}(?:\.\d{3})*|\d+)(?:,\d{2})?$/

export function formatCentsToBRLCurrency(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export function parseBRLCurrencyToCents(value: string): number {
  return Math.round(
    Number(value.replace('.', '').replace(',', '.')) * 100
  )
}

export function fmtValueToImageUriRequest(uri: string) {
  return `${api.defaults.baseURL}/images/${uri}`
}