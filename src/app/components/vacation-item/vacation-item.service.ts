import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, merge, of, skip, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationItemService {

  private readonly defaultState = 'default';
  private readonly selectedChangedState = 'selectedChanged';
  private readonly selectedState = 'selected';

  private readonly iconStateSource$ = new BehaviorSubject<string>(this.defaultState);

  readonly isSelected$: Observable<boolean>; // Observable that emits true when the icon is selected

  constructor(
  ) {
    this.isSelected$ = this.getIsSelectedObservable();
  }

  public getNewState(currentState: string): string {
    return currentState === this.defaultState ? this.selectedState : this.defaultState
  }

  public getIconState$(): Observable<string> {
    return this.iconStateSource$.asObservable()
  }

  public setIconSelectedValue(value: string): void {
    return this.iconStateSource$.next(value)
  }


  public getIconStateWithTimerObservable(selected: boolean): Observable<string> {
    return merge(this.getInitialState(selected), this.getSelectedStateObservable())
  }

  // Returns an observable that emits initial state based on input
  private getInitialState(selected: boolean) {
    return of(selected ? this.selectedState : this.defaultState)
  }

  // Returns an observable that emits true when the icon is selected
  private getIsSelectedObservable(): Observable<boolean> {
    return this.iconStateSource$.pipe(
      map(state => state === this.selectedState),
    );
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
