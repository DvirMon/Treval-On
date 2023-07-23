import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { FavoriteService } from '../favorite.service';
import { FavoriteActions } from './favorite.actions';
import { FavoritesSelectors } from './favorite.selectors';

import { EMPTY, catchError, concatMap, map, switchMap } from 'rxjs';



@Injectable()
export class FavoritesEffects {


  constructor(
    private store: Store,
    private actions$: Actions,
    private favoriteService: FavoriteService
  ) { }


  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      concatMap((action) => this.favoriteService.getFavorite$(action.userId)
        .pipe(
          map((favorite) => FavoriteActions.loadFavoriteSuccess({ favorite })),
          catchError(() => EMPTY)
        ))
    )
  )

  updateFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.updateFavorite),
      switchMap(() => this.store.select(FavoritesSelectors.selectFavorite)
        .pipe(
          switchMap((favorite) => this.favoriteService.updateFavorite$(favorite?.userId as string, favorite?.vacationIds as string[])))
        .pipe(
          map(() => ({ type: 'NO_ACTION' })),
          catchError(() => EMPTY)
        ))
    ))
}
