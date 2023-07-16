import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, Signal, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectionListChange, VacationListComponent } from 'src/app/vacation/vacation-list/vacation-list.component';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { map } from 'rxjs';

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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly vacations: Signal<Vacation[]>;
  protected readonly selection: Signal<Record<string, boolean>>

  constructor() {
    this.vacations = this.storeService.getVacations();
    this.selection = this._getSelectionFroRoute()
  }

  ngOnDestroy(): void {
    this.storeService.updateFavorites()
  }

  private _getSelectionFroRoute(): Signal<Record<string, boolean>> {
    return toSignal(this.route.data.pipe(map((data: Data) => data['routeResolver']),), { initialValue: {} });
  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.storeService.updateSelection(selection)
  }



}
