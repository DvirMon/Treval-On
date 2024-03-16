import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, input } from "@angular/core";
import {
  SelectChangedEvent,
  PlacesCardComponent,
} from "../place-card/places-card.component";
import { Places } from "../../store/places/places.model";

type PlaceSelection = Record<string, boolean>;

export interface SelectionListChange {
  source: PlacesListComponent;
  selection: PlaceSelection;
}

@Component({
  selector: "to-places-list",
  standalone: true,
  imports: [CommonModule, PlacesCardComponent],
  templateUrl: "./place-list.component.html",
  styleUrls: ["./place-list.component.scss"],
})
export class PlacesListComponent {
  places = input.required<Places[]>();
  selection = input.required<PlaceSelection>();

  @Output() readonly selectionChanged: EventEmitter<SelectionListChange> =
    new EventEmitter<SelectionListChange>();

  public onSelectedChanged(event: SelectChangedEvent): void {
    const { source, selected } = event;
    const { place } = source;

    const newSelection = this._updateStoreSelection(
      this.selection(),
      selected,
      place()
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
