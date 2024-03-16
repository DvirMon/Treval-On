import { createReducer, on } from "@ngrx/store";
import { mapAuthServerError } from "../utils/auth.helpers";
import { AuthActions } from "./auth.actions";
import { initialState } from "./auth.state";

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...state,
    user: {
      ...action.user,
    },
    loaded: true,
  })),

  on(AuthActions.loadUserFailure, (state, action) => ({
    ...state,
    serverError: mapAuthServerError(action.code, action.event),
  })),

  on(AuthActions.sendResetEmailFailure, (state, action) => ({
    ...state,
    serverError: mapAuthServerError(action.code, action.event),
  })),

  on(AuthActions.sendEmailLinkSuccess, (state, action) => ({
    ...state,
    email: action.email,
  })),

  on(AuthActions.cleanup, (state) => ({
    ...state,
    serverError: null,
  })),

  on(AuthActions.logout, () => ({
    ...initialState,
  }))
);
