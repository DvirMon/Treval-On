import { Component, Input, OnDestroy, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListChange, VacationListComponent } from 'src/app/vacation/vacation-list/vacation-list.component';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [CommonModule, VacationListComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnDestroy {

  @Input() userId!: string

  private readonly storeService: StoreService = inject(StoreService);

  protected readonly vacations: Signal<Vacation[]>;
  protected readonly selection: Signal<Record<string, boolean>>;


  constructor() {
    this.vacations = this.storeService.getVacations();
    this.selection = this.storeService.getSelectedFavorites('2')
  }

  ngOnDestroy(): void {
    this.storeService.updateFavorites()

  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.storeService.updateSelection(selection)
  }



}
