import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorite.state';

const selectState = createFeatureSelector<fromFavorites.State>(fromFavorites.favoritesFeatureKey);

const selectFavoritesVacationsLoaded = createSelector(
  selectState,
  (state: fromFavorites.State): boolean => state.loaded
);

const selectFavorite = createSelector(
  selectState,
  (state: fromFavorites.State) => state.favorite
)
const selectFavoritesVacations = createSelector(
  selectState,
  (state: fromFavorites.State) => state.favorite?.vacationIds.reduce((acc, value) => {
    return {
      ...acc,
      [value]: true
    }
  }, {} as Record<string, boolean>)
)

export const FavoritesSelectors = {
  selectFavoritesVacationsLoaded,
  selectFavorite,
  selectFavoritesVacations
}
