import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteService } from '../favorites.service';
import { FavoriteActions } from './favorite.actions';
import { EMPTY, catchError, concatMap, map } from 'rxjs';



@Injectable()
export class FavoritesEffects {


  constructor(private actions$: Actions, private favoriteService: FavoriteService) { }


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
}
