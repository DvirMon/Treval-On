import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {  SelectChangedEvent, SelectState, VacationItemButtonComponent } from '../vacation-item-button/vacation-item-button.component';
import { Vacation } from 'src/app/vacation.model';


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
  @Input() selectedMap!: Signal<Record<string, boolean>>


  readonly isSelected: Signal<boolean> = computed(() => !!this.selectedMap()[this.vacation.id])
  readonly selected: Signal<SelectState> = computed(() => this.isSelected() ? SelectState.SELECTED : SelectState.DEFAULT)

  @Output() readonly changed: EventEmitter<SelectChangedEvent> = new EventEmitter();

  protected onButtonClick(event: SelectChangedEvent): void {
    this._emitChangeEvent(event)
  }

  private _emitChangeEvent(event: SelectChangedEvent): void {
    this.changed.emit(this._createChangeEvent(event))
  }

  protected _createChangeEvent(value: SelectChangedEvent): SelectChangedEvent {
    const event: SelectChangedEvent = {
      ...value,
      source: this,
    };
    return event;
  }




}


