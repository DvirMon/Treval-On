import { Component, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { StoreService } from 'src/app/store/store.service';



@Component({
  selector: 'to-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private readonly storeService : StoreService = inject(StoreService)
  protected readonly vacations: Signal<Vacation[]>;

  constructor() {
    this.vacations = this.storeService.getVacations();
  }


}
