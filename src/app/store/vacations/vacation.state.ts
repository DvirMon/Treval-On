import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vacation } from './vacation.model';

export const vacationsFeatureKey = 'vacations';

export interface State extends EntityState<Vacation> {
  selectedId?: string | number; // which Coins record has been selected
  loaded: boolean; // has the Coins list been loaded
  error?: string | null; // last known error (if any)
  selected: Record<string, boolean>;
}

export const adapter: EntityAdapter<Vacation> = createEntityAdapter<Vacation>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  selected: {},

  // additional entity state properties
});




