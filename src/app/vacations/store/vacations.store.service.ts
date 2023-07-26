import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { VacationActions } from './vacation.actions';
import { Vacation } from './vacation.model';
import { VacationSelectors } from './vacation.selectors';

@Injectable({
  providedIn: 'root'
})
export class VacationsStore {

  constructor(private store: Store) { }


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

}
