import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VacationService } from 'src/app/vacation/vacations.service';
import { VacationActions } from './vacation.actions';
import { concatMap, map, catchError, EMPTY, tap } from 'rxjs';
import { Vacation } from './vacation.model';



@Injectable()
export class VacationEffects {


  constructor(
    private vacationService: VacationService,
    private actions$: Actions

  ) { }


  // load coin from Http request
  loadVacations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VacationActions.loadVacations),
      concatMap(() => this.vacationService.getVacations$()
        .pipe(
          map((vacations: Vacation[]) => VacationActions.loadVacationsSuccess({ vacations })),
          catchError(() => EMPTY)
        ))
    ))
}
