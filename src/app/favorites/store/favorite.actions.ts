import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Favorite } from './favorite.model';

export const FavoriteActions = createActionGroup({
  source: 'Favorite/API',
  events: {
    'Load Favorites': props<{ userId: string }>(),
    'Load Favorite Success': props<{ favorite: Favorite }>(),
    'Add Favorite': props<{ favorite: Favorite }>(),
    'Update Favorite': emptyProps(),
    'Delete Favorite': props<{ id: string }>(),
    'Clear Favorites': emptyProps(),
    'Update Selected Favorites Places': props<{ selected:Record<string, boolean> }>(),

  }
});
