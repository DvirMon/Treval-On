import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { VacationSelectors } from './vacations/vacation.selectors';
import { VacationActions } from './vacations/vacation.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, iif, of, switchMap, tap } from 'rxjs';
import { Vacation } from './vacations/vacation.model';
import { FavoritesSelectors } from '../favorites/store/favorites.selectors';
import { FavoriteActions } from '../favorites/store/favorite.actions';
import { Favorite } from '../favorites/store/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store
  ) { }


  public getVacations(): Signal<Vacation[] | never[]> {
    const loaded$ = this.store.select(VacationSelectors.selectVacationsLoaded)

    const vacations$: Observable<Vacation[]> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(VacationActions.loadVacations());
        }
        return this.store.select(VacationSelectors.selectAllVacations);
      })
    );
    return toSignal(vacations$, { initialValue: [] });
  }

  public getSelectedFavorites(userId: string): Signal<Record<string, boolean>> {

    const loaded$ = this.store.select(FavoritesSelectors.selectFavoritesVacationsLoaded);

    const favorite$ = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(FavoriteActions.loadFavorites({ userId }));
        }
        return this.store.select(FavoritesSelectors.selectFavoritesVacations);
      }))

    return toSignal(favorite$, { initialValue: {} })
  }

  public updateSelection(selected: Record<string, boolean>) {
    const action = FavoriteActions.updateSelectedFavoritesVacations({ selected })
    this.store.dispatch(action)
  }

  public updateFavorites(favorite:  Favorite) {
    const action = FavoriteActions.updateFavorite({ favorite })
    this.store.dispatch(action)

  }

}
