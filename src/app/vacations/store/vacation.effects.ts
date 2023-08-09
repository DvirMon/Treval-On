import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VacationsService } from 'src/app/vacations/vacations.service';
import { VacationActions } from './vacation.actions';
import { concatMap, map, catchError, EMPTY } from 'rxjs';
import { Vacation } from './vacation.model';



@Injectable()
export class VacationEffects {


  constructor(
    private VacationsService: VacationsService,
    private actions$: Actions

  ) { }


  // load coin from Http request
  loadVacations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VacationActions.loadVacations),
      concatMap(() => this.VacationsService.getVacations$()
        .pipe(
          map((vacations: Vacation[]) => VacationActions.loadVacationsSuccess({ vacations })),
          catchError(() => EMPTY)
        ))
    ))
}
