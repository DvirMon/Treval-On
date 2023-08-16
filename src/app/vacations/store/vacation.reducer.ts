import { createReducer, on } from '@ngrx/store';
import { PlacesActions } from './vacation.actions';
import { initialState, adapter } from './vacation.state';
import { AuthActions } from 'src/app/auth/store/auth.actions';

export const vacationReducer = createReducer(
  initialState,
  on(PlacesActions.loadPlaces, (state) => state),

  on(PlacesActions.loadPlacesSuccess,
    (state, action) => ({
      ...adapter.setAll(action.vacations, state),
      loaded: true
    })
  ),

  on(PlacesActions.addPlaces,
    (state, action) => adapter.addOne(action.vacation, state)
  ),

  on(PlacesActions.updatePlaces,
    (state, action) => adapter.updateOne(action.vacation, state)
  ),
  on(PlacesActions.deletePlaces,
    (state, action) => adapter.removeOne(action.id, state)
  ),

  on(AuthActions.logout, () => ({
    ...initialState
  }))

);

