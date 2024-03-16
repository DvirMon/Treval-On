import { Favorite } from './favorite.model';


export const favoritesFeatureKey = 'favorites';

export interface State {
  favorite: Favorite | null
  loaded: boolean;

}

export const initialState: State = {
  favorite: null,
  loaded: false,
}
