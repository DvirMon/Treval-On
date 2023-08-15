import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, combineLatest, filter, forkJoin, map, take } from 'rxjs';
import { FavoriteStore } from 'src/app/favorites/favorite.store.service';
import { Vacation } from 'src/app/vacations/store/vacation.model';
import { VacationsStore } from 'src/app/vacations/store/vacations.store.service';

export const placesResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  favoriteStore = inject(FavoriteStore)
): Observable<Record<string, boolean>> =>
  getSelectedFavorites(favoriteStore, route.paramMap.get('userId') as string,);

// function getPlacesData(favoriteStore: FavoriteStore, userId: string, vacationStore: VacationsStore) {
//   return forkJoin({ selected: getSelectedFavorites(favoriteStore, userId), places: getVacations(vacationStore) })
// }

function getSelectedFavorites(favoriteStore: FavoriteStore, userId: string): Observable<Record<string, boolean>> {
  return favoriteStore.getSelectedFavorites(userId)
    .pipe(
      filter<Record<string, boolean>>((selection: Record<string, boolean>) => !!selection),
      // take(1)
    );
}

function getVacations(vacationStore: VacationsStore): Observable<Vacation[]> {
  return toObservable(vacationStore.getVacations())
}
