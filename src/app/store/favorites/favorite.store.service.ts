import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, switchMap } from 'rxjs';
import { FavoriteActions } from './favorite.actions';
import { FavoritesSelectors } from './favorite.selectors';

@Injectable({
  providedIn: 'root'
})
export class FavoriteStore {

  constructor(
    private store: Store
  ) { }

  public getSelectedFavorites(userId: string) {

    const loaded$ = this.store.select(FavoritesSelectors.selectFavoritesVacationsLoaded);

    const favorite$: Observable<Record<string, boolean>> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(FavoriteActions.loadFavorites({ userId }));
        }
        return this.store.select(FavoritesSelectors.selectFavoritesVacations) as Observable<Record<string, boolean>>;
      }))

    return favorite$
  }

  public updateSelection(selected: Record<string, boolean>) {
    const action = FavoriteActions.updateSelectedFavoritesPlaces({ selected })
    this.store.dispatch(action)
  }

  public updateFavorites() {
    const action = FavoriteActions.updateFavorite()
    this.store.dispatch(action)

  }

}
