import { AuthServerError, User } from "../utils/auth.model";

export const authFeatureKey = "auth";

export interface State {
  user: User;
  loaded: boolean;
  email: string;
  serverError: AuthServerError | null;
}

export const initialState: State = {
  user: {} as User,
  loaded: false,
  email: "",
  serverError: null,
};
