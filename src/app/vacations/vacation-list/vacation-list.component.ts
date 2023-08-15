import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesCardComponent, PlacesSelectedChangedEvent } from '../vacation-item/vacation-card.component';
import { Places } from '../store/vacation.model';

export interface SelectionListChange {
  source: PlacesListComponent
  selection: Record<string, boolean>
}

@Component({
  selector: 'to-vacation-list',
  standalone: true,
  imports: [CommonModule, PlacesCardComponent],
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class PlacesListComponent {

  @Input({ required: true }) vacations: Signal<Places[]> = signal([]);

  @Input({ required: true }) selection: Signal<Record<string, boolean>> = signal({});

  @Output() readonly selectionChanged: EventEmitter<SelectionListChange> = new EventEmitter<SelectionListChange>();


  protected onSelectedChanged(event: PlacesSelectedChangedEvent): void {
    const { source, selected } = event
    const { vacation } = source

    const newSelection = this._updateStoreSelection(this.selection(), selected, vacation)
    this._emitChangeEvent(newSelection);

  }

  private _updateStoreSelection(selection: Record<string, boolean>, selected: boolean, vacation: Places): Record<string, boolean> {

    let newSelection = { ...selection }; // Create a copy of the original selection

    if (selected) {
      newSelection = {
        ...selection,
        [vacation.id]: selected
      }
    } else {
      delete newSelection[vacation.id];
    }

    return newSelection
  }

  _emitChangeEvent(selection: Record<string, boolean>) {
    const event = { source: this, selection } as SelectionListChange
    this.selectionChanged.emit(event);
  }

}
