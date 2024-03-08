import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { initialState } from './auth.state';
import { mapAuthServerError } from '../auth.helpers';


export const authReducer = createReducer(
  initialState,

  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...state,
    user: {
      ...action.user
    },
    loaded: true
  })),

  on(AuthActions.loadUserFailure, (state, action) => ({
    ...state,
    serverError : mapAuthServerError(action.code)
  })),

  on(AuthActions.sendResetEmailFailure, (state, action) => ({
    ...state,
    serverError : mapAuthServerError(action.code)
  })),

  on(AuthActions.sendEmailLinkSuccess, (state, action) => ({
    ...state,
    email: action.email
  })),

  on(AuthActions.logout, () => ({
    ...initialState
  }))
);

