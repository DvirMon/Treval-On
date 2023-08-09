import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoriteStore } from 'src/app/favorites/favorite.store.service';
import { Vacation } from 'src/app/vacations/store/vacation.model';
import { VacationsStore } from 'src/app/vacations/store/vacations.store.service';
import { VacationListComponent, SelectionListChange } from 'src/app/vacations/vacation-list/vacation-list.component';
import { map } from 'rxjs';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [CommonModule, VacationListComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesComponent {

  @Input() userId!: string

  private readonly vacationsStore: VacationsStore = inject(VacationsStore);
  private readonly favoriteStore: FavoriteStore = inject(FavoriteStore);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly vacations: Signal<Vacation[]>;
  protected readonly selection: Signal<Record<string, boolean>>

  constructor() {
    this.vacations = this.vacationsStore.getVacations();
    this.selection = this._getSelectionFroRoute()
  }


  private _getSelectionFroRoute(): Signal<Record<string, boolean>> {
    return toSignal(this.route.data.pipe(map((data: Data) => data['routeResolver']),), { initialValue: {} });
  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.favoriteStore.updateSelection(selection)
    this.favoriteStore.updateFavorites()
  }



}
