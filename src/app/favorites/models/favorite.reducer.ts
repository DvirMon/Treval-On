import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favorite } from './favorite.model';
import { FavoriteActions } from './favorite.actions';

export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<Favorite> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
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
  on(FavoriteActions.loadFavorites,
    (state, action) => adapter.setAll(action.favorites, state)
  ),
  on(FavoriteActions.clearFavorites,
    state => adapter.removeAll(state)
  ),
);

export const favoritesFeature = createFeature({
  name: favoritesFeatureKey,
  reducer,
  extraSelectors: ({ selectFavoritesState }) => ({
    ...adapter.getSelectors(selectFavoritesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = favoritesFeature;
