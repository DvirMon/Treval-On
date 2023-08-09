export interface User {
  userId: string
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
  OPT = 'oneTimePassword',
  EMAIL_LINK = 'emailLink',
  EMAIL_PASSWORD = 'password',
  FACEBOOK = 'facebook.com',
  GITHUB = 'github.com',
  GOOGLE = 'google.com',
  PHONE = 'phone',
  TWITTER = 'twitter.com',
}

export interface SignInEvent {
  method: SignInMethod,
  data: unknown
}
