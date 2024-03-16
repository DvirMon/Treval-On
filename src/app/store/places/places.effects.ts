import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { concatMap, map, catchError, EMPTY } from "rxjs";
import { PlacesActions } from "./places.actions";
import { Places } from "./places.model";
import { PlacesService } from "../../places/places.service";

@Injectable()
export class PlacesEffects {
  constructor(
    private PlacesService: PlacesService,
    private actions$: Actions
  ) {}

  // load coin from Http request
  loadPlaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlacesActions.loadPlaces),
      concatMap(() =>
        this.PlacesService.getPlaces$().pipe(
          map((places: Places[]) =>
            PlacesActions.loadPlacesSuccess({ places })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
