import { Component, Input, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { StoreService } from 'src/app/store/store.service';
import { VacationCardComponent } from 'src/app/vacation/vacation-item/vacation-card.component';



@Component({
  selector: 'to-home',
  standalone: true,
  imports: [CommonModule, VacationCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input() userId! : string

  private readonly storeService : StoreService = inject(StoreService)
  protected readonly vacations: Signal<Vacation[]>;

  constructor() {
    this.vacations = this.storeService.getVacations();
  }


}
