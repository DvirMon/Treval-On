import { createReducer, on } from '@ngrx/store';
import { VacationActions } from './vacation.actions';

export const vacationFeatureKey = 'vacation';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

