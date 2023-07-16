import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { VacationSelectors } from './vacations/vacation.selectors';
import { VacationActions } from './vacations/vacation.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { Vacation } from './vacations/vacation.model';
import { FavoritesSelectors } from '../favorites/store/favorites.selectors';
import { FavoriteActions } from '../favorites/store/favorite.actions';
import { Observable, switchMap } from 'rxjs';

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

  public getSelectedFavorites(userId: string) {

    const loaded$ = this.store.select(FavoritesSelectors.selectFavoritesVacationsLoaded);

    const favorite$: Observable<Record<string, boolean>> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(FavoriteActions.loadFavorites({ userId }));
        }
        return this.store.select(FavoritesSelectors.selectFavoritesVacations) as Observable<Record<string, boolean>>;
      }))

    // return toSignal(favorite$, { initialValue: {} })
    return favorite$
  }

  public updateSelection(selected: Record<string, boolean>) {
    const action = FavoriteActions.updateSelectedFavoritesVacations({ selected })
    this.store.dispatch(action)
  }

  public updateFavorites() {
    const action = FavoriteActions.updateFavorite()
    this.store.dispatch(action)

  }

}
