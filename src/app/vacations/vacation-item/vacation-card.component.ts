import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  signal,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DateTimestampPipe } from "src/app/utilities/pipes/date.pipe";
import { Places } from "../store/vacation.model";
import {
  ButtonSelectedChangedEvent,
  VacationCardButtonComponent,
} from "../vacation-item-button/vacation-card-button.component";

export interface PlacesSelectedChangedEvent {
  /** The source button of the event. */
  source: PlacesCardComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}
@Component({
  selector: "to-places-card",
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    DateTimestampPipe,
    MatCardModule,
    VacationCardButtonComponent,
  ],
  templateUrl: "./vacation-card.component.html",
  styleUrls: ["./vacation-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesCardComponent {
  @Input({ required: true }) vacation!: Places;

  protected readonly isSelected: WritableSignal<boolean>;

  constructor() {
    this.isSelected = signal(false);
  }

  @Input()
  set selected(value: boolean) {
    this.isSelected.set(value);
  }

  @Output() readonly selectedChanged: EventEmitter<PlacesSelectedChangedEvent> =
    new EventEmitter();

  protected onSelectedChanged(value: ButtonSelectedChangedEvent): void {
    const event = this._createChangeEvent(value);
    this.selectedChanged.emit(event);
  }

  private _createChangeEvent(
    value: ButtonSelectedChangedEvent
  ): PlacesSelectedChangedEvent {
    const event: PlacesSelectedChangedEvent = {
      selected: value.selected,
      source: this,
    };
    return event;
  }
}
