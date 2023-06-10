import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BehaviorSubject, Observable, of, map, skip, switchMap, timer, merge, take, tap, Subject, delay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

export interface ButtonClickEvent {
  /** The source button of the event. */
  source: VacationItemButtonComponent;
  /** The new `selected` value of the button. */
  selected: boolean;

  selectedState: SelectState
}

export type SelectState = 'default' | 'selected' | 'changeState'

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
      state('changeState', style({
        transform: 'scale(1.2)',
        color: '#fb3958'
      })),
      state('selected', style({
        transform: 'scale(1)',
        color: '#fb3958'
      })),
      transition('default <=> changeState', animate('0.2s ease')),
      transition('selected <=> changeState', animate('0.2s ease'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VacationItemButtonComponent {

  @Input() selected!: Signal<SelectState>


  private readonly defaultState = 'default';
  private readonly changedState = 'changeState';
  private readonly selectedState = 'selected';

  // private _iconStateSource$!: BehaviorSubject<SelectState>;
  // private _isSelected$!: Observable<boolean>; // Observable that emits true when the icon is selected
  // public iconStateWithTimer$!: Observable<SelectState>; // Observable that includes a timer delay for the default state

  public selectState: Signal<SelectState> = computed(() => this.selected() !== undefined ? this.selected() : this.defaultState)

  private readonly clickEvent: BehaviorSubject<SelectState> = new BehaviorSubject<SelectState>(this.defaultState)

  readonly mergeClickState$ = merge(this.clickEvent.asObservable().pipe(skip(1), map(() => this.changedState as SelectState)), this._getDelayClickEvent())

  readonly iconState: Signal<SelectState | undefined> = toSignal(this.mergeClickState$);

  @Output() readonly changed: EventEmitter<ButtonClickEvent> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    // this._iconStateSource$ = new BehaviorSubject<SelectState>(this.selectState());
    // this._isSelected$ = this._getIsSelectedObservable();
    // this.iconStateWithTimer$ = this._getIconStateWithTimerObservable();
  }


  private _getDelayClickEvent(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      delay(500),
      tap((selected) => console.log(selected)),
      map((state: SelectState) => state === this.selectedState),
      map((selected: boolean) => selected ? this.defaultState : this.selectedState)
    )
  }

  // // Returns an observable that emits true when the icon is selected
  // private _getIsSelectedObservable(): Observable<boolean> {
  //   return this._iconStateSource$.pipe(
  //     map(state => state === this.selectedState),
  //   );
  // }

  // private _getIconStateWithTimerObservable(): Observable<SelectState> {
  //   return merge(this._getInitialState$(), this._getSelectedStateObservable())
  // }

  // // Returns an observable that emits initial state based on input
  // private _getInitialState$(): Observable<SelectState> {
  //   return this._iconStateSource$.asObservable().pipe(take(1))
  // }


  // // Returns an observable that switches between the timer observable and the default state observable based on the selected state
  // private _getSelectedStateObservable(): Observable<SelectState> {
  //   return this._isSelected$.pipe(
  //     skip(1),
  //     switchMap(selected => this._getIconStateObservable(selected, this.changedState))
  //   );
  // }

  // // Return an observable that combines the next state based on the selected state and the timer observable with the selected changed state.
  // private _getIconStateObservable(selected: boolean, changeState: SelectState): Observable<SelectState> {

  //   const nextState = selected ? this.selectedState : this.defaultState;
  //   const timerObservable = this._getTimerObservable(nextState);

  //   return this._mergeStateWithTimerObservable(changeState, timerObservable);
  // }

  // // Create an Observable that emits the specified state after a delay of 200 milliseconds
  // private _getTimerObservable(state: SelectState): Observable<SelectState> {
  //   return timer(500).pipe(
  //     map(() => state),
  //     tap(() => this._emitChangeEvent(state, state)))
  // }

  // private _mergeStateWithTimerObservable(state: SelectState, timerObservable: Observable<SelectState>): Observable<SelectState> {
  //   const stateObservable = of(state);
  //   return merge(stateObservable, timerObservable);
  // }


  public onButtonClick(selectState: SelectState | undefined): void {
    if (selectState === undefined) {
      selectState = this.selectState()
    }

    if (selectState === this.changedState) {
      return
    }

    this.clickEvent.next(selectState)
    this._handleButtonClick(this._getNewState(selectState));
  }

  private _handleButtonClick(newState: SelectState): void {
    // this._iconStateSource$.next(newState);
    // this._emitChangeEvent(newState, this.changedState);
    this._emitChangeEvent(newState, newState);
  }

  private _getNewState(currentState: string): SelectState {

    return currentState === this.defaultState ? this.selectedState : this.defaultState;
  }

  private _emitChangeEvent(newState: string, currentState: SelectState): void {
    this.changed.emit(this._createChangeEvent(newState, currentState))
  }

  protected _createChangeEvent(newState: string, selectedState: SelectState): ButtonClickEvent {
    const event: ButtonClickEvent = {

      source: this,
      selected: this._setChangeValue(newState),
      selectedState: selectedState
    };

    return event;
  }

  private _setChangeValue(newState: string): boolean {
    return newState !== this.defaultState ? true : false
  }
}
