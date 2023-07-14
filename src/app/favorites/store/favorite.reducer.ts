import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { initialState, adapter } from './favorite.state';


export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.addFavorite,
    (state, action) => adapter.addOne(action.favorite, state)
  ),

  on(FavoriteActions.deleteFavorite,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(FavoriteActions.loadFavoriteSuccess,
    (state, action) => ({
      ...adapter.setAll([action.favorite], state),
      loaded: true,
      selected: action.favorite.vacationIds.reduce((acc, value) => {
        return {
          ...acc,
          [value]: true
        }
      }, {})
    })
  ),
  on(FavoriteActions.clearFavorites,
    state => adapter.removeAll(state)
  ),

  on(FavoriteActions.updateSelectedFavoritesVacations,
    (state, action) => (
      {
        ...state,
        selected: {
          ...action.selected
        }

      }))
);

