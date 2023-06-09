import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BehaviorSubject, Observable, delay, filter, map, merge, of, skip, skipWhile, switchMap, tap, timer } from 'rxjs';
import { VacationItemService } from './vacation-item.service';

@Component({
  selector: 'to-vacation-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './vacation-item.component.html',
  styleUrls: ['./vacation-item.component.scss'],
  animations: [
    trigger('iconAnimation', [
      state('default', style({
        transform: 'scale(1)',
        color: '#9E9E9E'
      })),
      state('selectedChanged', style({
        transform: 'scale(1.2)',
        color: '#fb3958'
      })),
      state('selected', style({
        transform: 'scale(1)',
        color: '#fb3958'
      })),
      transition('default <=> selectedChanged', animate('0.2s ease')),
      transition('selected <=> selectedChanged', animate('0.2s ease'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationItemComponent {
  readonly iconStateWithTimer$: Observable<string>; // Observable that includes a timer delay for the default state

  constructor(
    private vacationItemService: VacationItemService
  ) {
    this.iconStateWithTimer$ = this.vacationItemService.getIconStateWithTimer$();
  }

  onClick(): void {
    const currentState = this.vacationItemService.getIconSelectedValue();
    const newState = this.vacationItemService.getNewState(currentState);
    this.vacationItemService.setIconSelectedValue(newState);
  }



}


