import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Favorite } from './favorite.model';

export const FavoriteActions = createActionGroup({
  source: 'Favorite/API',
  events: {
    'Load Favorites': props<{ userId: string }>(),
    'Load Favorite Success': props<{ favorite: Favorite }>(),
    'Add Favorite': props<{ favorite: Favorite }>(),
    'Update Favorite': props<{ favorite: Update<Favorite> }>(),
    'Delete Favorite': props<{ id: string }>(),
    'Clear Favorites': emptyProps(),
    'Update Selected Favorites Vacations': props<{ selected:Record<string, boolean> }>(),

  }
});
