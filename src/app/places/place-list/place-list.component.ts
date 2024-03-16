import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Places } from "../store/places.model";
import {
  PlacesCardComponent,
  PlacesSelectedChangedEvent,
} from "../place-item/places-card.component";

export interface SelectionListChange {
  source: PlacesListComponent;
  selection: Record<string, boolean>;
}

@Component({
  selector: "to-places-list",
  standalone: true,
  imports: [CommonModule, PlacesCardComponent],
  templateUrl: "./place-list.component.html",
  styleUrls: ["./place-list.component.scss"],
})
export class PlacesListComponent {
  
  @Input({ required: true }) places: Signal<Places[]> = signal([]);

  @Input({ required: true }) selection: Signal<Record<string, boolean>> =
    signal({});

  @Output() readonly selectionChanged: EventEmitter<SelectionListChange> =
    new EventEmitter<SelectionListChange>();

  protected onSelectedChanged(event: PlacesSelectedChangedEvent): void {
    const { source, selected } = event;
    const { place } = source;

    const newSelection = this._updateStoreSelection(
      this.selection(),
      selected,
      place
    );
    this._emitChangeEvent(newSelection);
  }

  private _updateStoreSelection(
    selection: Record<string, boolean>,
    selected: boolean,
    places: Places
  ): Record<string, boolean> {
    let newSelection = { ...selection }; // Create a copy of the original selection

    if (selected) {
      newSelection = {
        ...selection,
        [places.id]: selected,
      };
    } else {
      delete newSelection[places.id];
    }

    return newSelection;
  }

  _emitChangeEvent(selection: Record<string, boolean>) {
    const event = { source: this, selection } as SelectionListChange;
    this.selectionChanged.emit(event);
  }
}
