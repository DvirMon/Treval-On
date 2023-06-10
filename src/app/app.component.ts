import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectChangedEvent, VacationItemComponent } from './components/vacation-item/vacation-item.component';
import { Vacation } from './vacation.model';
import { CommonModule } from '@angular/common';
import { SelectState } from './components/vacation-item-button/vacation-item-button.component';

@Component({
  selector: 'to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, VacationItemComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = 'travel-on';

  readonly vacations: Vacation[] = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]

  readonly selectedVacations: WritableSignal<Record<string, SelectState>> = signal({ 1: SelectState.SELECTED, 4: SelectState.SELECTED })

  onSelectChanged(event: SelectChangedEvent): void {
    const { source, selectedState, selected } = event
    const { vacation } = source

    this.selectedVacations.update((state) => {
      return {
        ...state,
        [vacation.id]: selectedState
      }
    })
  }
}
