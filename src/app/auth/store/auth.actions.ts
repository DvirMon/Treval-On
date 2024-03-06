import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, Register, SignInEvent } from './auth.model';


export const AuthActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Sign In': props<{ signInEvent: SignInEvent }>(),
    'Sign In Success': props<{ user: User }>(),
    'Send Email Link': props<{ email: string }>(),
    'Send Email Link Success': props<{ email: string }>(),
    'Load User': props<{ userId: string }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ code: string }>(),
    'Reset Password': props<{ email: string }>(),
    'Create User': props<{ email: string, password: string }>(),
    'Update User': props<{ register: Register }>(),
    'Logout': emptyProps(),
  }
});
