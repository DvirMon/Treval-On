import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Favorite } from './favorite.model';

// export const favoritesFeatureKey = 'favorites';

// export interface State extends Favorite {
//   // additional entities state properties
//   load: boolean;
//   selected: Record<string, boolean>;

// }



export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<Favorite> {
  // additional entities state properties
  load: boolean;
  selected: Record<string, boolean>;

}

export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  load: false,
  selected: {}
});
