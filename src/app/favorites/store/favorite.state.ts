import { Favorite } from './favorite.model';
import { Timestamp } from '@angular/fire/firestore';


export const favoritesFeatureKey = 'favorites';

export interface State {
  // additional entities state properties
  favorite: Favorite | null
  loaded: boolean;
  // selected: Record<string, boolean>;

}

// export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialState: State = {
  // additional entity state properties
  favorite: null,
  loaded: false,
  // selected: {}
}
