import { User } from "./auth.model";

export const authFeatureKey = 'auth';

export interface State {
  user: User
  loaded: boolean;
  email: string;

}

export const initialState: State = {
  user: {} as User,
  loaded: false,
  email: "",
}
