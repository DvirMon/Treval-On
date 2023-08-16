import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlacesService } from 'src/app/vacations/vacations.service';
import { PlacesActions } from './vacation.actions';
import { Places } from './vacation.model';
import { concatMap, map, catchError, EMPTY } from 'rxjs';



@Injectable()
export class PlacesEffects {


  constructor(
    private PlacesService: PlacesService,
    private actions$: Actions

  ) { }


  // load coin from Http request
  loadPlaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlacesActions.loadPlaces),
      concatMap(() => this.PlacesService.getVacations$()
        .pipe(
          map((vacations: Places[]) => PlacesActions.loadPlacesSuccess({ vacations })),
          catchError(() => EMPTY)
        ))
    ))
}
