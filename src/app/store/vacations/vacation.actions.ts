import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vacation } from './vacation.model';


export const VacationActions = createActionGroup({
  source: 'Vacation/API',
  events: {
    'Load Vacations': emptyProps(),
    'Load Vacations Success': props<{ vacations: Vacation[] }>(),
    'Load Vacations Failure': props<{ error: unknown }>(),
    'Add Vacation': props<{ vacation: Vacation }>(),
    'Update Vacation': props<{ vacation: Update<Vacation> }>(),
    'Delete Vacation': props<{ id: string }>(),
    'Clear Vacations': emptyProps(),
  }
});
