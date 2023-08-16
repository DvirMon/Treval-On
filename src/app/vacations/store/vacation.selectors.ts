import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVacation from './vacation.state';

 const selectState = createFeatureSelector<fromVacation.State>(fromVacation.vacationsFeatureKey);

const {
  selectAll,
} = fromVacation.adapter.getSelectors();

 const selectPlacesLoaded = createSelector(
  selectState,
  (state: fromVacation.State): boolean => state.loaded
);

 const selectPlaces = createSelector(
  selectState,
  (state : fromVacation.State) => selectAll(state)
);


export const PlacesSelectors =  {
  selectPlacesLoaded,
  selectPlaces,
}
