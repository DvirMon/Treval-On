import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Vacation } from 'src/app/vacation.model';
import { VacationCardButtonComponent, SelectChangedEvent } from '../vacation-item-button/vacation-card-button.component';


@Component({
  selector: 'to-vacation-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, VacationCardButtonComponent],
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationCardComponent {

  @Input() vacation!: Vacation

  protected readonly isSelected: WritableSignal<boolean>;

  constructor() {
    this.isSelected = signal(false);
  }

  @Input()
  set selected(value: boolean) {
    this.isSelected.set(value)
  }

  @Output() readonly selectChanged: EventEmitter<SelectChangedEvent> = new EventEmitter();

  protected onSelectChanged(value: SelectChangedEvent): void {
    const event = this._createChangeEvent(value)
    this.selectChanged.emit(event)
  }

  private _createChangeEvent(value: SelectChangedEvent): SelectChangedEvent {
    const event: SelectChangedEvent = {
      ...value,
      source: this,
    };
    return event;
  }




}


