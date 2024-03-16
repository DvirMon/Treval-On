import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as formPlaces from './places.state';

 const selectState = createFeatureSelector<formPlaces.State>(formPlaces.placesFeatureKey);

const {
  selectAll,
} = formPlaces.adapter.getSelectors();

 const selectPlacesLoaded = createSelector(
  selectState,
  (state: formPlaces.State): boolean => state.loaded
);

 const selectPlaces = createSelector(
  selectState,
  (state : formPlaces.State) => selectAll(state)
);


export const PlacesSelectors =  {
  selectPlacesLoaded,
  selectPlaces,
}
