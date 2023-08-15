import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { VacationActions } from './vacation.actions';
import { Vacation } from './vacation.model';
import { VacationSelectors } from './vacation.selectors';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationsStore {


  private readonly vacationLoaded: Signal<boolean>
  private readonly vacations: Signal<Vacation[]>

  constructor(private store: Store) {
    this.vacationLoaded = this.store.selectSignal(VacationSelectors.selectVacationsLoaded);
    this.vacations = this.store.selectSignal(VacationSelectors.selectVacations);
  }


  public getVacations$(): Observable<Vacation[]> {
    const loaded$ = this.store.select(VacationSelectors.selectVacationsLoaded)

    const vacations$: Observable<Vacation[]> = loaded$.pipe(
      switchMap((loaded: boolean) => {

        if (!loaded) {
          this.store.dispatch(VacationActions.loadVacations());
        }
        return this.store.select(VacationSelectors.selectVacations);
      })
    );
    return vacations$.pipe(tap((value) => console.group('vacations', value)))
  }

  public getVacations() {

    if (!this.vacationLoaded()) {
      this.store.dispatch(VacationActions.loadVacations());
    }
    return this.vacations
  }




}
