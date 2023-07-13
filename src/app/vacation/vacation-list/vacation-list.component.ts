import { Component, DestroyRef, EventEmitter, Input, Output, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { VacationCardComponent, VacationSelectedChangedEvent } from '../vacation-item/vacation-card.component';

export interface SelectionListChange {
  source: VacationListComponent
  selections: Map<string, Vacation>
}

@Component({
  selector: 'to-vacation-list',
  standalone: true,
  imports: [CommonModule, VacationCardComponent],
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.scss']
})
export class VacationListComponent {

  @Input() userId!: string

  private readonly storeService: StoreService = inject(StoreService)
  protected readonly vacations: Signal<Vacation[]>;

  private _selection: Map<string, Vacation>

  @Output() readonly selectionChange: EventEmitter<SelectionListChange> = new EventEmitter<SelectionListChange>();


  constructor() {
    this.vacations = this.storeService.getVacations();
    this._selection = new Map<string, Vacation>();

  }

  ngOnDestroy() {
    console.log("onDestroy")

  }

  protected onSelectedChanged(event: VacationSelectedChangedEvent): void {
    const { source, selected } = event
    const { vacation } = source

    const newSelection = this._updateSelection(this._selection, selected, vacation)
    this._emitChangeEvent(newSelection);

  }

  private _updateSelection(selection: Map<string, Vacation>, selected: boolean, vacation: Vacation): Map<string, Vacation> {

    const newSelection = new Map<string, Vacation>(selection); // Create a copy of the original selection map

    if (selected) {
      newSelection.set(vacation.id, vacation);
    } else {
      newSelection.delete(vacation.id);
    }

    return newSelection
  }

  _emitChangeEvent(selections: Map<string, Vacation>) {
    const event = { source: this, selections } as SelectionListChange
    this.selectionChange.emit(event);
  }

}
