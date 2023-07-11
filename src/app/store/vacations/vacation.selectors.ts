import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVacation from './vacation.state';

 const selectState = createFeatureSelector<fromVacation.State>(fromVacation.vacationsFeatureKey);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,

} = fromVacation.adapter.getSelectors();

 const selectVacationsLoaded = createSelector(
  selectState,
  (state: fromVacation.State): boolean => state.loaded
);

 const selectAllVacations = createSelector(
  selectState,
  (state : fromVacation.State) => selectAll(state)
);

export const VacationSelectors =  {
  selectVacationsLoaded,
  selectAllVacations
}
