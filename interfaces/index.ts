export interface User {
  access_token: null | string
  admin: boolean
  created_at: string
  email: string
  external_code: string
  id: number
  name: string
  renew_password: boolean
  role: string | number
  tags: string[] | string
  updated_at: string
}
