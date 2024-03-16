import { environment } from "src/environments/environment";

export enum StorageKey {
  EMAIL = "EMAIL",
  LOGGED = "LOGGED",
  NOT_LOGGED = "NOT_LOGGED",
  PENDING = "PENDING",
}

export const DEFAULT_EMAIL = environment.email
