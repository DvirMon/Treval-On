import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FavoriteStore } from 'src/app/favorites/favorite.store.service';
import { Observable, filter } from 'rxjs';

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

