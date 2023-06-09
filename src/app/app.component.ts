import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectChangedEvent, VacationItemComponent } from './components/vacation-item/vacation-item.component';
import { Vacation } from './vacation.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, VacationItemComponent, NgFor]
})
export class AppComponent {
  title = 'travel-on';

  readonly vacations: Vacation[] = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]

  readonly selectedVacations: WritableSignal<Record<string, boolean>> = signal({ 1: true, 4: true })

  onSelectChanged(event: SelectChangedEvent): void {
    const { source, selected } = event
    const { vacation } = source

    this.selectedVacations.update((state) => {
      return {
        ...state,
        [vacation.id]: selected
      }
    })
  }
}
