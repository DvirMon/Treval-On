import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, EmailAndPasswordSignIn, Register } from './auth.model';


export const AuthActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Sign In With Gmail': emptyProps(),
    'Load User': props<{ login: EmailAndPasswordSignIn }>(),
    'Load User Success': props<{ user: User }>(),
    'Add User': props<{ register: Register }>(),
    'Update User': props<{ register: Register }>(),
    'Clear User': emptyProps(),
  }
});
