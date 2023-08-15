import { createReducer, on } from '@ngrx/store';
import { VacationActions } from './vacation.actions';
import { initialState, adapter } from './vacation.state';
import { AuthActions } from 'src/app/auth/store/auth.actions';

export const vacationReducer = createReducer(
  initialState,
  on(VacationActions.loadVacations, (state) => state),

  on(VacationActions.loadVacationsSuccess,
    (state, action) => ({
      ...adapter.setAll(action.vacations, state),
      loaded: true
    })
  ),

  on(VacationActions.addVacation,
    (state, action) => adapter.addOne(action.vacation, state)
  ),

  on(VacationActions.updateVacation,
    (state, action) => adapter.updateOne(action.vacation, state)
  ),
  on(VacationActions.deleteVacation,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(VacationActions.clearVacations,
    state => adapter.removeAll(state)
  ),
  
  on(AuthActions.logout, () => ({
    ...initialState
  }))

);

