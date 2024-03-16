import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BehaviorSubject, Observable, delay, map, merge, skip } from "rxjs";

export interface ButtonSelectionChangedEvent {
  /** The source button of the event. */
  source: PlaceCardButtonComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}

export enum SelectState {
  DEFAULT = "default",
  CHANGED = "changeState",
  SELECTED = "selected",
}

@Component({
  selector: "to-place-card-button",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: "./place-card-button.component.html",
  styleUrls: ["./place-card-button.component.scss"],
  animations: [
    trigger("iconAnimation", [
      state(
        "default",
        style({
          transform: "scale(1)",
          color: "#9E9E9E",
        })
      ),
      state(
        "changeState",
        style({
          transform: "scale(1.2)",
        })
      ),
      state(
        "selected",
        style({
          transform: "scale(1)",
        })
      ),
      transition("default <=> changeState", animate("0.1s ease")),
      transition("selected <=> changeState", animate("0.1s ease")),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceCardButtonComponent {
  private readonly clickEvent: BehaviorSubject<SelectState>;
  protected readonly isSelected: Signal<SelectState>;
  protected readonly iconState: Signal<SelectState | undefined>;

  selected = input.required<boolean>();

  @Output() readonly changed: EventEmitter<ButtonSelectionChangedEvent> =
    new EventEmitter();

  constructor() {
    this.isSelected = computed(() =>
      this.selected() ? SelectState.SELECTED : SelectState.DEFAULT
    );
    this.clickEvent = new BehaviorSubject<SelectState>(SelectState.DEFAULT);

    this.iconState = toSignal(this._getIconState$());
  }

  private _getIconState$(): Observable<SelectState> {
    return merge(this._getChangeState$(), this._getSelectedState$());
  }

  private _getChangeState$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      map(() => SelectState.CHANGED)
    );
  }

  private _getSelectedState$(): Observable<SelectState> {
    return this.clickEvent.asObservable().pipe(
      skip(1),
      delay(300),
      map((state: SelectState) => state === SelectState.SELECTED),
      map((selected: boolean) =>
        selected ? SelectState.DEFAULT : SelectState.SELECTED
      )
    );
  }

  public onButtonClick(currentState: SelectState | undefined): void {
    if (currentState === undefined) {
      currentState = this.isSelected();
    }

    if (currentState === SelectState.CHANGED) {
      return;
    }

    this.clickEvent.next(currentState);

    const newState = this._calculateNewState(currentState);
    this._handleChangeEvent(newState);
  }

  private _calculateNewState(currentState: string): SelectState {
    return currentState === SelectState.DEFAULT
      ? SelectState.SELECTED
      : SelectState.DEFAULT;
  }

  private _handleChangeEvent(newState: SelectState): void {
    const event = this._createChangeEvent(newState);
    this._emitChangeEvent(event);
  }

  private _emitChangeEvent(event: ButtonSelectionChangedEvent): void {
    this.changed.emit(event);
  }

  private _createChangeEvent(
    newState: SelectState
  ): ButtonSelectionChangedEvent {
    const event: ButtonSelectionChangedEvent = {
      source: this,
      selected: newState !== SelectState.DEFAULT,
    };
    return event;
  }
}
