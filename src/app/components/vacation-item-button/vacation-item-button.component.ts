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

  private readonly clickEvent: BehaviorSubject<SelectState>;
  private readonly selectStateWithDelay$: Observable<SelectState>;

  protected readonly selectState: Signal<SelectState>;
  protected readonly iconState: Signal<SelectState | undefined>;

  @Output() readonly changed: EventEmitter<ButtonClickEvent> = new EventEmitter();

  constructor() {
    this.selectState = this._getSelectedState()
    this.clickEvent = new BehaviorSubject<SelectState>(this.defaultState);
    this.selectStateWithDelay$ = this._getSelectStateWithDelay$();
    this.iconState = toSignal(this.selectStateWithDelay$);
  }

  private _getSelectedState(): Signal<SelectState> {
    return computed(() => this.selected() !== undefined ? this.selected() : this.defaultState)
  }

  private _getSelectStateWithDelay$(): Observable<SelectState> {
    return merge(this._getSelectState$(), this._getDelayClickEvent$())
  }

  private _getSelectState$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      map(() => this.changedState as SelectState))
  }


  private _getDelayClickEvent$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      delay(500),
      map((state: SelectState) => state === this.selectedState),
      map((selected: boolean) => selected ? this.defaultState : this.selectedState)
    )
  }


  protected onButtonClick(selectState: SelectState | undefined): void {

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
