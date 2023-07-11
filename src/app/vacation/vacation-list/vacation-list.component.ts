import { Component, Input, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { VacationCardComponent } from '../vacation-item/vacation-card.component';

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


  constructor() {
    this.vacations = this.storeService.getVacations();
  }
}
