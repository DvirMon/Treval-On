import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, Signal, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectionListChange, VacationListComponent } from 'src/app/vacation/vacation-list/vacation-list.component';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { map } from 'rxjs';
import { VacationsStoreService } from 'src/app/store/vacations.store.service';
import { FavoriteStoreService } from 'src/app/favorites/favorite.store.service';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [CommonModule, VacationListComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnDestroy {

  @Input() userId!: string

  private readonly vacationsStore: VacationsStoreService = inject(VacationsStoreService);
  private readonly favoriteStore: FavoriteStoreService = inject(FavoriteStoreService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly vacations: Signal<Vacation[]>;
  protected readonly selection: Signal<Record<string, boolean>>

  constructor() {
    this.vacations = this.vacationsStore.getVacations();
    this.selection = this._getSelectionFroRoute()
  }

  ngOnDestroy(): void {
    this.favoriteStore.updateFavorites()
  }

  private _getSelectionFroRoute(): Signal<Record<string, boolean>> {
    return toSignal(this.route.data.pipe(map((data: Data) => data['routeResolver']),), { initialValue: {} });
  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.favoriteStore.updateSelection(selection)
  }



}
