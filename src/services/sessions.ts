import { AppError } from "@/utils/AppError";
import { api } from "./api";

type PostSessionResponse = {
  token: string,
  user: {
    id: string,
    avatar: string,
    name: string,
    email: string,
    tel: string,
  },
  refresh_token: string
}

type PostRefreshTokenResponse = {
  token: string
  refresh_token: string
}

const prefix = '/sessions'

export async function postSession(email: string, password: string) {
  try {
    const { data } = await api.post<PostSessionResponse>(
      prefix,
      { email, password }
    )

    if (!(data.user && data.token && data.refresh_token)) {
      throw new AppError('Algo de errado aconteu com sua solicitação tente novamente mais tarde')
    }

    return data

  } catch (error) {
    throw error
  }
}

export async function postRefreshToken(refresh_token: string) {
  try {
    const { data } = await api.post<PostRefreshTokenResponse>(
      `${prefix}/refresh-token`,
      { refresh_token }
    )

    if (!(data.token && data.refresh_token)) {
      throw new AppError('Algo de errado aconteu com sua solicitação tente novamente mais tarde')
    }

    return data

  } catch (error) {
    throw error
  }
}