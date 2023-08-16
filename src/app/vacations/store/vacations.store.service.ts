import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlacesActions } from './vacation.actions';
import { Places } from './vacation.model';
import { PlacesSelectors } from './vacation.selectors';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationsStore {


  private readonly vacationLoaded: Signal<boolean>
  private readonly vacations: Signal<Places[]>

  constructor(private store: Store) {
    this.vacationLoaded = this.store.selectSignal(PlacesSelectors.selectPlacesLoaded);
    this.vacations = this.store.selectSignal(PlacesSelectors.selectPlaces);
  }


  public getVacations$(): Observable<Places[]> {
    const loaded$ = this.store.select(PlacesSelectors.selectPlacesLoaded)

    const vacations$: Observable<Places[]> = loaded$.pipe(
      switchMap((loaded: boolean) => {

        if (!loaded) {
          this.store.dispatch(PlacesActions.loadPlaces());
        }
        return this.store.select(PlacesSelectors.selectPlaces);
      })
    );
    return vacations$.pipe(tap((value) => console.group('vacations', value)))
  }

  public getVacations() {

    if (!this.vacationLoaded()) {
      this.store.dispatch(PlacesActions.loadPlaces());
    }
    return this.vacations
  }




}
