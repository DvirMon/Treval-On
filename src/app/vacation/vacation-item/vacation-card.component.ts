import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonSelectedChangedEvent, VacationCardButtonComponent } from '../vacation-item-button/vacation-card-button.component';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { DateTimestampPipe } from 'src/app/utilities/date.pipe';

export interface VacationSelectedChangedEvent {
  /** The source button of the event. */
  source: VacationCardComponent;
  /** The new `selected` value of the button. */
  selected: boolean;
}
@Component({
  selector: 'to-vacation-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage,  DateTimestampPipe, MatCardModule, VacationCardButtonComponent],
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationCardComponent {

  @Input({ required: true }) vacation!: Vacation

  protected readonly isSelected: WritableSignal<boolean>;

  constructor() {
    this.isSelected = signal(false);
  }

  @Input()
  set selected(value: boolean) {
    this.isSelected.set(value)
  }

  @Output() readonly selectedChanged: EventEmitter<VacationSelectedChangedEvent> = new EventEmitter();

  protected onSelectedChanged(value: ButtonSelectedChangedEvent): void {
    const event = this._createChangeEvent(value)
    this.selectedChanged.emit(event)
  }

  private _createChangeEvent(value: ButtonSelectedChangedEvent): VacationSelectedChangedEvent {
    const event: VacationSelectedChangedEvent = {
      selected : value.selected,
      source: this,
    };
    return event;
  }




}


