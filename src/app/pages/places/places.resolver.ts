import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { FavoriteStoreService } from 'src/app/favorites/favorite.store.service';

export const placesResolver: ResolveFn<Observable<Record<string, boolean>>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  favoriteStore: FavoriteStoreService = inject(FavoriteStoreService)
) => {
  return favoriteStore.getSelectedFavorites(route.paramMap.get('userId') as string)
    .pipe(
      filter<Record<string, boolean>>((selection: Record<string, boolean>) => !!selection),
      take(1)
    );
};
