import { storageAuthTokenGet, storageAuthTokenSave } from "@/storage/storageAuthToken";
import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@/utils/AppError";

type SignOut = () => void

type PromiseType = {
  onSucess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenMenager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: "http://192.168.3.27:3333",
  timeout: 6000
}) as APIInstanceProps

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

async function processRejection(requestError: any, signOut: SignOut) {
  if (requestError?.response?.status === 401) {

    if (
      requestError.response.data?.message === 'token.expired' ||
      requestError.response.data?.message === 'token.invalid'
    ) {
      return processTokenExpired(requestError, signOut)
    }

    signOut()
  }

  if (requestError.response && requestError.response.data) {
    return Promise.reject(
      new AppError(requestError.response.data.message)
    )
  }

  return Promise.reject(requestError)
}

async function processTokenExpired(requestError: any, signOut: SignOut) {
  const authTokens = await storageAuthTokenGet();

  if (!authTokens?.refresh_token) {
    signOut()
    return Promise.reject(requestError)
  }

  const originalRequestConfig = requestError.config

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({
        onSucess: (token: string) => {
          originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
          resolve(api(originalRequestConfig))
        },
        onFailure: (error: AxiosError) => {
          reject(error)
        }
      })
    })
  }

  isRefreshing = true

  return new Promise(async (resolve, reject) => {
    try {
      const { data: { token, refresh_token } } = await api.post(
        'sessions/refresh-token',
        authTokens.refresh_token
      )

      await storageAuthTokenSave({ token: token, refresh_token: refresh_token })

      if (originalRequestConfig.data) {
        originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
      }

      originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      failedQueue.forEach(request => {
        request.onSucess(token)
      })

      resolve(api(originalRequestConfig))

    } catch (error: any) {
      failedQueue.forEach(request => {
        request.onFailure(error)
      })

      signOut()
      reject(error)

    } finally {
      isRefreshing = false
      failedQueue = []
    }
  })
}

api.registerInterceptTokenMenager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(
    response => response,
    rejection => processRejection(rejection, signOut)
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }