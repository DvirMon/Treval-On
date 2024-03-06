import { ServerError, User } from "./auth.model";

export const authFeatureKey = "auth";

export interface State {
  user: User;
  loaded: boolean;
  email: string;
  serverError: ServerError | null;
}

export const initialState: State = {
  user: {} as User,
  loaded: false,
  email: "",
  serverError: null,
};
