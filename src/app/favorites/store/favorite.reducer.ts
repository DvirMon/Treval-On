import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { initialState } from './favorite.state';
import { Favorite } from './favorite.model';


export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.loadFavoriteSuccess,
    (state, action) => ({
      favorite: {
        ...action.favorite,
      },
      loaded: true,
      // selected: action.favorite.vacationIds.reduce((acc, value) => {
      //   return {
      //     ...acc,
      //     [value]: true
      //   }
      // }, {})
    })
  ),

  on(FavoriteActions.updateSelectedFavoritesVacations,
    (state, action) => (
      {
        ...state,
        favorite: {
          ...state.favorite as Favorite,
       vacationIds : [...Object.keys(action.selected)]
        },
      }))
);

