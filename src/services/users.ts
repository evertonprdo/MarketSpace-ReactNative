import { api } from "./api"

type PostUserRequest = {
  avatar: {
    name: string,
    uri: string,
    type: string
  },
  name: string,
  email: string,
  tel: string,
  password: string
}

const prefix = '/users'

export async function postUser({ avatar, email, name, password, tel }: PostUserRequest) {
  try {
    const userForm = new FormData()

    userForm.append('avatar', avatar as unknown as Blob)
    userForm.append('name', name)
    userForm.append('email', email)
    userForm.append('tel', tel)
    userForm.append('password', password)

    await api.post(prefix, userForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

  } catch (error) {
    throw error
  }
}