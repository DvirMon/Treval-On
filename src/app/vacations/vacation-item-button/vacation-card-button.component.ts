import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, booleanAttribute, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BehaviorSubject, Observable, merge, skip, map, delay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

export interface ButtonSelectedChangedEvent {
  /** The source button of the event. */
  source: VacationCardButtonComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}

export enum SelectState {
  DEFAULT = 'default',
  CHANGED = 'changeState',
  SELECTED = 'selected'
}

@Component({
  selector: 'to-places-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './vacation-card-button.component.html',
  styleUrls: ['./vacation-card-button.component.scss'],
  animations: [
    trigger('iconAnimation', [
      state('default', style({
        transform: 'scale(1)',
        color: '#9E9E9E'
      })),
      state('changeState', style({
        transform: 'scale(1.2)',
      })),
      state('selected', style({
        transform: 'scale(1)',
      })),
      transition('default <=> changeState', animate('0.2s ease')),
      transition('selected <=> changeState', animate('0.2s ease'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VacationCardButtonComponent {

  private readonly clickEvent: BehaviorSubject<SelectState>;
  private readonly selectStateWithDelay$: Observable<SelectState>;

  protected readonly isSelected: WritableSignal<SelectState>;
  protected readonly iconState: Signal<SelectState | undefined>;


  @Output() readonly changed: EventEmitter<ButtonSelectedChangedEvent> = new EventEmitter();

  constructor() {
    this.isSelected = signal<SelectState>(SelectState.DEFAULT);
    this.clickEvent = new BehaviorSubject<SelectState>(SelectState.DEFAULT);
    this.selectStateWithDelay$ = this._getSelectStateWithDelay$();
    this.iconState = toSignal(this.selectStateWithDelay$);
  }


  @Input({ required: true, transform : booleanAttribute })
  set selected(value: boolean) {
    this.isSelected.set(this._getSelectedState(value))
  }

  private _getSelectedState(value: boolean): SelectState {
    return value ? SelectState.SELECTED : SelectState.DEFAULT

  }

  private _getSelectStateWithDelay$(): Observable<SelectState> {
    return merge(this._getChangeState$(), this._getDelayClickEvent$());
  }

  private _getChangeState$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      map(() => SelectState.CHANGED))
  }

  private _getDelayClickEvent$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      delay(500),
      map((state: SelectState) => state === SelectState.SELECTED),
      map((selected: boolean) => selected ? SelectState.DEFAULT : SelectState.SELECTED)
    )
  }

  protected onButtonClick(currentState: SelectState | undefined): void {

    if (currentState === undefined) {
      currentState = this.isSelected()
    }

    if (currentState === SelectState.CHANGED) {
      return
    }

    this.clickEvent.next(currentState)

    const newState = this._calculateNewState(currentState);
    this._handleChangeEvent(newState);
  }

  private _calculateNewState(currentState: string): SelectState {
    return currentState === SelectState.DEFAULT ? SelectState.SELECTED : SelectState.DEFAULT;
  }

  private _handleChangeEvent(newState: SelectState): void {
    const event = this._createChangeEvent(newState)
    this._emitChangeEvent(event);
  }


  private _emitChangeEvent(event: ButtonSelectedChangedEvent): void {
    this.changed.emit(event)
  }

  private _createChangeEvent(newState: SelectState): ButtonSelectedChangedEvent {
    const event: ButtonSelectedChangedEvent = {
      source: this,
      selected: newState !== SelectState.DEFAULT,
    };
    return event;
  }


}
