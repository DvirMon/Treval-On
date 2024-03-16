import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Places } from "./places.model";

export const placesFeatureKey = "places";

export interface State extends EntityState<Places> {
  selectedId?: string | number; // which Places record has been selected
  loaded: boolean; // has the Coins list been loaded
  error?: string | null; // last known error (if any)
}

export const adapter: EntityAdapter<Places> = createEntityAdapter<Places>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
});
