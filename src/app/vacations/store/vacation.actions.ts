import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Places } from './vacation.model';


export const VacationActions = createActionGroup({
  source: 'Places/API',
  events: {
    'Load Vacations': emptyProps(),
    'Load Vacations Success': props<{ vacations: Places[] }>(),
    'Load Vacations Failure': props<{ error: unknown }>(),
    'Add Places': props<{ vacation: Places }>(),
    'Update Places': props<{ vacation: Update<Places> }>(),
    'Delete Places': props<{ id: string }>(),
    'Clear Vacations': emptyProps(),
  }
});


