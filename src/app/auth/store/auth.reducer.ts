import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { initialState } from './auth.state';


export const authReducer = createReducer(
  initialState,

  on(AuthActions.loadUserSuccess, (state, action) => ({
    ...state,
    user: {
      ...action.user
    },
    loaded: true
  })),

  on(AuthActions.sendEmailLinkSuccess, (state, action) => ({
    ...state,
    email: action.email
  }))
);

