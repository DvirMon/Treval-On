import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const VacationActions = createActionGroup({
  source: 'LoadVacation',
  events: {
    'Load LoadVacations': emptyProps(),
    'Load LoadVacations Success': props<{ data: unknown }>(),
    'Load LoadVacations Failure': props<{ error: unknown }>(),
  }
});
