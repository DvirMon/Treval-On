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
import { DateTimestampPipe } from "src/app/shared/pipes/date.pipe";
import { Places } from "../store/places.model";
import { ButtonSelectedChangedEvent } from "../place-item-button/place-card-button.component";

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
  ],
  templateUrl: "./places-card.component.html",
  styleUrls: ["./places-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesCardComponent {

  @Input({ required: true }) place!: Places;

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
