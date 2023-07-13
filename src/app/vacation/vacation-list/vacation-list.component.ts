import { Component, DestroyRef, EventEmitter, Input, Output, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { VacationCardComponent, VacationSelectedChangedEvent } from '../vacation-item/vacation-card.component';

export interface SelectionListChange {
  source: VacationListComponent
  selection: Map<string, boolean>
}

@Component({
  selector: 'to-vacation-list',
  standalone: true,
  imports: [CommonModule, VacationCardComponent],
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent {

  @Input({ required: true }) vacations: Signal<Vacation[]> = signal([]);

  @Input({ required: true }) selection: Signal<Map<string, boolean>> = signal(new Map());

  @Output() readonly selectionChanged: EventEmitter<SelectionListChange> = new EventEmitter<SelectionListChange>();


  protected onSelectedChanged(event: VacationSelectedChangedEvent): void {
    const { source, selected } = event
    const { vacation } = source

    const newSelection = this._updateSelection(this.selection(), selected, vacation)
    this._emitChangeEvent(newSelection);

  }

  private _updateSelection(selection: Map<string, boolean>, selected: boolean, vacation: Vacation): Map<string, boolean> {

    const newSelection = new Map<string, boolean>(selection); // Create a copy of the original selection map

    if (selected) {
      newSelection.set(vacation.id, selected);
    } else {
      newSelection.delete(vacation.id);
    }

    return newSelection
  }

  _emitChangeEvent(selection: Map<string, boolean>) {
    const event = { source: this, selection } as SelectionListChange
    this.selectionChanged.emit(event);
  }

}
