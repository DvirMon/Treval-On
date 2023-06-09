import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BehaviorSubject, Observable, of, map, skip, switchMap, timer, merge, take } from 'rxjs';

export interface ButtonClickEvent {
  /** The source button of the event. */
  source: VacationItemButtonComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}

@Component({
  selector: 'to-vacation-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './vacation-item-button.component.html',
  styleUrls: ['./vacation-item-button.component.scss'],
  animations: [
    trigger('iconAnimation', [
      state('default', style({
        transform: 'scale(1)',
        color: '#9E9E9E'
      })),
      state('selectedChanged', style({
        transform: 'scale(1.2)',
        color: '#fb3958'
      })),
      state('selected', style({
        transform: 'scale(1)',
        color: '#fb3958'
      })),
      transition('default <=> selectedChanged', animate('0.2s ease')),
      transition('selected <=> selectedChanged', animate('0.2s ease'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VacationItemButtonComponent {

  @Input() selected!: boolean

  private readonly defaultState = 'default';
  private readonly selectedChangedState = 'selectedChanged';
  private readonly selectedState = 'selected';

  private _iconStateSource$!: BehaviorSubject<string>;
  private _isSelected$!: Observable<boolean>; // Observable that emits true when the icon is selected
  public iconStateWithTimer$!: Observable<string>; // Observable that includes a timer delay for the default state

  @Output() readonly changed: EventEmitter<ButtonClickEvent> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this._iconStateSource$ = new BehaviorSubject<string>(this._getInitialState(this.selected));
    this._isSelected$ = this._getIsSelectedObservable();
    this.iconStateWithTimer$ = this._getIconStateWithTimerObservable(this.selected);
  }

  // Returns an observable that emits true when the icon is selected
  private _getIsSelectedObservable(): Observable<boolean> {
    return this._iconStateSource$.pipe(
      map(state => state === this.selectedState),
    );
  }

  private _getIconStateWithTimerObservable(selected: boolean): Observable<string> {
    return merge(this._getInitialState$(), this._getSelectedStateObservable())
  }

  // Returns an observable that emits initial state based on input
  private _getInitialState$(): Observable<string> {
    return this._iconStateSource$.asObservable().pipe(take(1))
  }

  // Returns an observable that emits initial state based on input
  private _getInitialState(selected: boolean): string {
    return (selected ? this.selectedState : this.defaultState)
  }

  // Returns an observable that switches between the timer observable and the default state observable based on the selected state
  private _getSelectedStateObservable(): Observable<string> {
    return this._isSelected$.pipe(
      skip(1),
      switchMap(selected => this._getIconStateObservable(selected, this.selectedChangedState))
    );
  }

  // Return an observable that combines the next state based on the selected state and the timer observable with the selected changed state.
  private _getIconStateObservable(selected: boolean, selectedChanged: string): Observable<string> {
    const nextState = selected ? this.selectedState : this.defaultState;

    const timerObservable = this._getTimerObservable(nextState);

    return this._mergeStateWithTimerObservable(selectedChanged, timerObservable);
  }

  // Create an Observable that emits the specified state after a delay of 200 milliseconds
  private _getTimerObservable(state: string): Observable<string> {
    return timer(200).pipe(map(() => state));
  }

  private _mergeStateWithTimerObservable(state: string, timerObservable: Observable<string>): Observable<string> {
    // Create an Observable that merges the state Observable with the timer Observable
    const stateObservable = of(state);
    return merge(stateObservable, timerObservable);
  }


  public onButtonClick(): void {
    const currentState = this._iconStateSource$.value;
    this._handleButtonClick(this._getNewState(currentState));
  }

  private _handleButtonClick(newState: string): void {
    this._iconStateSource$.next(newState);
    this._emitChangeEvent(newState);
  }

  private _getNewState(currentState: string): "selected" | "default" {
    return currentState === this.defaultState ? this.selectedState : this.defaultState;
  }

  private _emitChangeEvent(newState: string): void {
    this.changed.emit(this._createChangeEvent(newState))
  }

  protected _createChangeEvent(newState: string): ButtonClickEvent {
    const event: ButtonClickEvent = {

      source: this,
      selected: this._setChangeValue(newState)
    };
    return event;
  }

  private _setChangeValue(newState: string): boolean {
    return newState === this.selectedState ? true : false
  }
}
