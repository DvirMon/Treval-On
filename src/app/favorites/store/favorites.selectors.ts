import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorite.state';

 const selectState = createFeatureSelector<fromFavorites.State>(fromFavorites.favoritesFeatureKey);


const selectFavorites = createSelector(
  selectState,
  (state : fromFavorites.State) => state.selected
)

export const FavoritesSelectors =  {
  selectFavorites
}
