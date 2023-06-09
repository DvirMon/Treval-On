import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, merge, of, skip, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationItemService {

  private readonly defaultState = 'default';
  private readonly selectedChangedState = 'selectedChanged';
  private readonly selectedState = 'selected';

  private readonly iconState$ = new BehaviorSubject<string>(this.defaultState);

  readonly isSelected$: Observable<boolean>; // Observable that emits true when the icon is selected

  readonly iconStateWithTimer$: Observable<string>; // Observable that includes a timer delay for the default state

  constructor(
  ) {
    this.isSelected$ = this.getIsSelectedObservable();
    this.iconStateWithTimer$ = this.getIconStateWithTimerObservable();
  }

  public getNewState(currentState: string): string {
    return currentState === this.defaultState ? this.selectedState : this.defaultState
  }

  public getIconSelectedValue(): string {
    return this.iconState$.value
  }
  public setIconSelectedValue(value: string): void {
    return this.iconState$.next(value)
  }

  public getIconStateWithTimer$() {
    return this.iconStateWithTimer$
  }

  // Returns an observable that emits true when the icon is selected
  private getIsSelectedObservable(): Observable<boolean> {
    return this.iconState$.pipe(
      map(state => state === this.selectedState),
    );
  }

  private getIconStateWithTimerObservable(): Observable<string> {
    return merge(of(this.defaultState), this.getSelectedStateObservable())
  }

  // Returns an observable that switches between the timer observable and the default state observable based on the selected state
  private getSelectedStateObservable(): Observable<string> {
    return this.isSelected$.pipe(
      skip(1),
      switchMap(selected => this.getIconStateObservable(selected, this.selectedChangedState))
    );
  }

  // Return an observable that combines the next state based on the selected state and the timer observable with the selected changed state.
  private getIconStateObservable(selected: boolean, selectedChanged: string): Observable<string> {
    const nextState = selected ? this.selectedState : this.defaultState;

    const timerObservable = this.getTimerObservable(nextState);

    return this.mergeStateWithTimerObservable(selectedChanged, timerObservable);
  }

  // Create an Observable that emits the specified state after a delay of 200 milliseconds
  private getTimerObservable(state: string): Observable<string> {
    return timer(200).pipe(map(() => state));
  }

  private mergeStateWithTimerObservable(state: string, timerObservable: Observable<string>): Observable<string> {
    // Create an Observable that merges the state Observable with the timer Observable
    const stateObservable = of(state);
    return merge(stateObservable, timerObservable);
  }


}
