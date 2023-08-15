import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from 'src/app/vacations/vacations.service';
import { VacationActions } from './vacation.actions';
import { concatMap, map, catchError, EMPTY } from 'rxjs';
import { Places } from './vacation.model';



@Injectable()
export class PlacesEffects {


  constructor(
    private PlacesService: PlacesService,
    private actions$: Actions

  ) { }


  // load coin from Http request
  loadVacations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VacationActions.loadVacations),
      concatMap(() => this.PlacesService.getVacations$()
        .pipe(
          map((vacations: Places[]) => VacationActions.loadVacationsSuccess({ vacations })),
          catchError(() => EMPTY)
        ))
    ))
}
