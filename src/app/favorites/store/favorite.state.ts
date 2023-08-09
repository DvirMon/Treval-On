import { Favorite } from './favorite.model';


export const favoritesFeatureKey = 'favorites';

export interface State {
  // additional entities state properties
  favorite: Favorite | null
  loaded: boolean;

}

// export const adapter: EntityAdapter<Favorite> = createEntityAdapter<Favorite>();

export const initialState: State = {
  // additional entity state properties
  favorite: null,
  loaded: false,
}
