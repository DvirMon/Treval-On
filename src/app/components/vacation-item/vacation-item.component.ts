import { ChangeDetectionStrategy, Component, Input, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { VacationItemService } from './vacation-item.service';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'
import { VacationItemButtonComponent } from '../vacation-item-button/vacation-item-button.component';

@Component({
  selector: 'to-vacation-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, VacationItemButtonComponent],
  templateUrl: './vacation-item.component.html',
  styleUrls: ['./vacation-item.component.scss'],
  providers: [VacationItemService],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationItemComponent {

  @Input() selected!: boolean

  public iconStateWithTimer$!: Observable<string>; // Observable that includes a timer delay for the default state


  constructor(
    private vacationItemService: VacationItemService
  ) { }

  ngOnInit(): void {
    this.iconStateWithTimer$ = this.vacationItemService.getIconStateWithTimerObservable(this.selected);
  }

  onClick(value: string): void {
    const newState = this.vacationItemService.getNewState(value);
    this.vacationItemService.setIconSelectedValue(newState);
  }



}


