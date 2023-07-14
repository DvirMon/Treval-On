import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorite.state';

 const selectState = createFeatureSelector<fromFavorites.State>(fromFavorites.favoritesFeatureKey);

 const selectFavoritesVacationsLoaded = createSelector(
  selectState,
  (state: fromFavorites.State): boolean => state.loaded
);

const selectFavorite = createSelector(
  selectState,
  (state : fromFavorites.State) => state.entities
)
const selectFavoritesVacations = createSelector(
  selectState,
  (state : fromFavorites.State) => state.selected
)

export const FavoritesSelectors =  {
  selectFavoritesVacationsLoaded,
  selectFavoritesVacations
}
