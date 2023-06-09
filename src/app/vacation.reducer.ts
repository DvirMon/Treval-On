import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vacation } from './vacation.model';
import { VacationActions } from './vacation.actions';

export const vacationsFeatureKey = 'vacations';

export interface State extends EntityState<Vacation> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Vacation> = createEntityAdapter<Vacation>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(VacationActions.addVacation,
    (state, action) => adapter.addOne(action.vacation, state)
  ),

  on(VacationActions.updateVacation,
    (state, action) => adapter.updateOne(action.vacation, state)
  ),
  on(VacationActions.deleteVacation,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(VacationActions.loadLoadVacationsSuccess,
    (state, action) => adapter.setAll(action.vacations, state)
  ),
  on(VacationActions.clearVacations,
    state => adapter.removeAll(state)
  ),
);

