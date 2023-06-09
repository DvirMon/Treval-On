import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Vacation } from './vacation.model';

export const VacationActions = createActionGroup({
  source: 'Vacation/API',
  events: {
    'Load LoadVacations': emptyProps(),
    'Load LoadVacations Success': props<{ vacations: Vacation[] }>(),
    'Load LoadVacations Failure': props<{ error: unknown }>(),
    'Add Vacation': props<{ vacation: Vacation }>(),
    'Update Vacation': props<{ vacation: Update<Vacation> }>(),
    'Delete Vacation': props<{ id: string }>(),
    'Clear Vacations': emptyProps(),
  }
});
