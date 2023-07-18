import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.state';

const selectState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

const selectLoaded = createSelector(
  selectState,
  (state: fromAuth.State): boolean => state.loaded
);

const selectUser = createSelector(
  selectState,
  (state: fromAuth.State) => state.user
)
export const AuthSelectors = {
  selectLoaded,
  selectUser,
}
