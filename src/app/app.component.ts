import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Vacation } from './vacation.model';
import { CommonModule } from '@angular/common';
import { arrayToRecord } from './utilities/helpers';
import { SelectChangedEvent } from './components/vacation-item-button/vacation-item-button.component';
import { VacationItemComponent } from './components/vacation-item/vacation-item.component';

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

  readonly selectedVacations: string[] = ['1', '4']

  readonly selectedMap: WritableSignal<Record<string, boolean>> = signal(arrayToRecord(this.selectedVacations))

  onSelectChanged(event: SelectChangedEvent): void {
    const { source, selected } = event
    const { vacation } = source

    this.selectedMap.update((state) => {

      if(selected) {
        state = {
          ...state,
          [vacation.id]: selected
        }
      }

      if(!selected) {

        delete state[vacation.id]
      }

      return state
    })
  }
}
