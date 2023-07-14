import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { initialState, adapter } from './favorite.state';


export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.addFavorite,
    (state, action) => adapter.addOne(action.favorite, state)
  ),
  on(FavoriteActions.updateFavorite,
    (state, action) => adapter.updateOne(action.favorite, state)
  ),
  on(FavoriteActions.deleteFavorite,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  // on(FavoriteActions.loadFavoritesSuccess,
  //   (state, action) => adapter.setAll(action.favorite.vacationIds, state)
  // ),
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
