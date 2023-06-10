import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonClickEvent, SelectState, VacationItemButtonComponent } from '../vacation-item-button/vacation-item-button.component';
import { Vacation } from 'src/app/vacation.model';

export interface SelectChangedEvent {
  /** The source button of the event. */
  source: VacationItemComponent;

  /** The new event of the button. */
  selected: boolean;

  selectedState : SelectState

}

@Component({
  selector: 'to-vacation-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, VacationItemButtonComponent],
  templateUrl: './vacation-item.component.html',
  styleUrls: ['./vacation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationItemComponent {

  @Input() vacation!: Vacation
  @Input() selectedMap!: Signal<Record<string, SelectState>>


  readonly selected: Signal<SelectState> = computed(() => this.selectedMap()[this.vacation.id])

  @Output() readonly changed: EventEmitter<SelectChangedEvent> = new EventEmitter();

  protected onButtonClick(event: ButtonClickEvent): void {
    this._emitChangeEvent(event)
  }

  private _emitChangeEvent(event: ButtonClickEvent): void {
    this.changed.emit(this._createChangeEvent(event))
  }

  protected _createChangeEvent(value: ButtonClickEvent): SelectChangedEvent {
    const event: SelectChangedEvent = {

      source: this,
      selected: value.selected,
      selectedState : value.selectedState
    };
    return event;
  }




}


