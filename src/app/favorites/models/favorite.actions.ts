import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Favorite } from './favorite.model';

export const FavoriteActions = createActionGroup({
  source: 'Favorite/API',
  events: {
    'Load Favorites': props<{ favorites: Favorite[] }>(),
    'Add Favorite': props<{ favorite: Favorite }>(),
    'Upsert Favorite': props<{ favorite: Favorite }>(),
    'Add Favorites': props<{ favorite: Favorite[] }>(),
    'Upsert Favorites': props<{ favorite: Favorite[] }>(),
    'Update Favorite': props<{ favorite: Update<Favorite> }>(),
    'Update Favorites': props<{ favorites: Update<Favorite>[] }>(),
    'Delete Favorite': props<{ id: string }>(),
    'Delete Favorites': props<{ ids: string[] }>(),
    'Clear Favorites': emptyProps(),
  }
});
