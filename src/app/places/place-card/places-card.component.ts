import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DateTimestampPipe } from "src/app/shared/pipes/date.pipe";
import {
  ButtonSelectionChangedEvent,
  PlaceCardButtonComponent,
} from "../place-card-button/place-card-button.component";
import { Places } from "../../store/places/places.model";

export interface SelectChangedEvent {
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
    PlaceCardButtonComponent,
  ],
  templateUrl: "./places-card.component.html",
  styleUrls: ["./places-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesCardComponent {
  place = input.required<Places>();

  selected = input.required<boolean>();

  @Output() readonly selectedChanged: EventEmitter<SelectChangedEvent> =
    new EventEmitter();

  public onSelectedChanged(value: ButtonSelectionChangedEvent): void {
    const event = this._createChangeEvent(value);
    this.selectedChanged.emit(event);
  }

  private _createChangeEvent(
    value: ButtonSelectionChangedEvent
  ): SelectChangedEvent {
    const event: SelectChangedEvent = {
      selected: value.selected,
      source: this,
    };
    return event;
  }
}
