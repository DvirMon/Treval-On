import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Places } from './vacation.model';


export const PlacesActions = createActionGroup({
  source: 'Places/API',
  events: {
    'Load Places': emptyProps(),
    'Load Places Success': props<{ vacations: Places[] }>(),
    'Load Places Failure': props<{ error: unknown }>(),
    'Add Places': props<{ vacation: Places }>(),
    'Update Places': props<{ vacation: Update<Places> }>(),
    'Delete Places': props<{ id: string }>(),
    'Clear Places': emptyProps(),
  }
});


