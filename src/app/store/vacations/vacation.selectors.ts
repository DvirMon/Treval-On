import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVacation from './vacation.state';

export const selectState = createFeatureSelector<fromVacation.State>(fromVacation.vacationsFeatureKey);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,

} = fromVacation.adapter.getSelectors();

export const selectCoinsLoaded = createSelector(
  selectState,
  (state: fromVacation.State): boolean => state.loaded
);

export const selectAllVacations = createSelector(
  selectState,
  (state : fromVacation.State) => selectAll(state)
);
