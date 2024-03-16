import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  input,
  signal,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DateTimestampPipe } from "src/app/shared/pipes/date.pipe";
import { Places } from "../store/places.model";
import {
  ButtonSelectionChangedEvent,
  PlaceCardButtonComponent,
} from "../place-card-button/place-card-button.component";

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
    PlaceCardButtonComponent,
  ],
  templateUrl: "./places-card.component.html",
  styleUrls: ["./places-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesCardComponent {
  place = input.required<Places>();

  // protected readonly isSelected: WritableSignal<boolean>;
  selected = input.required<boolean>();

  constructor() {
    // this.isSelected = signal(false);
  }

  // @Input()
  //   this.isSelected.set(value);
  // }

  @Output() readonly selectedChanged: EventEmitter<PlacesSelectedChangedEvent> =
    new EventEmitter();

  public onSelectedChanged(value: ButtonSelectionChangedEvent): void {
    const event = this._createChangeEvent(value);
    this.selectedChanged.emit(event);
  }

  private _createChangeEvent(
    value: ButtonSelectionChangedEvent
  ): PlacesSelectedChangedEvent {
    const event: PlacesSelectedChangedEvent = {
      selected: value.selected,
      source: this,
    };
    return event;
  }
}
