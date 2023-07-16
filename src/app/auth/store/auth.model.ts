export interface User {
  id: string
  email: string
  emailVerified: boolean
  displayName: string
  photoURL: string
}
export interface Login {
  email: string
  password: string
}
export interface Register {
  email: string
  phone: string
  first_name: string
  last_name: string
}
