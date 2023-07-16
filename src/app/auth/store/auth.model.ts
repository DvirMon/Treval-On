export interface User {
  id: string
  email: string
  emailVerified: boolean
  displayName: string
  photoURL: string
}
export interface EmailAndPasswordSignIn {
  email: string
  password: string
}
export interface Register {
  email: string
  phone: string
  first_name: string
  last_name: string
}

export enum SignInMethod {
  Google,
  EmailAndPassword,
  EmailLink,
  OPT,
}

export interface SignInEvent {
  method: SignInMethod,
  data: any
}
