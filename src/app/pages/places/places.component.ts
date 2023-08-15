import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input, Signal, inject, runInInjectionContext } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoriteStore } from 'src/app/favorites/favorite.store.service';
import { Vacation } from 'src/app/vacations/store/vacation.model';
import { VacationsStore } from 'src/app/vacations/store/vacations.store.service';
import { VacationListComponent, SelectionListChange } from 'src/app/vacations/vacation-list/vacation-list.component';
import { Observable, map, tap } from 'rxjs';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [CommonModule, VacationListComponent, FloatingButtonComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesComponent {

  @Input() userId!: string
  private readonly injector = inject(Injector);

  private readonly favoriteStore: FavoriteStore = inject(FavoriteStore);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly vacations: Signal<Vacation[]>;
  protected readonly selection: Signal<Record<string, boolean>>

  constructor() {
    this.vacations = inject(VacationsStore).getVacations()
    this.selection =this._getSelectionFroRoute()
  }


  private _getSelectionFroRoute(): Signal<Record<string, boolean>> {
    return toSignal(this.route.data.pipe(map((data: Data) => data['placesResolver']),), { initialValue: {} });
  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.favoriteStore.updateSelection(selection)
    this.favoriteStore.updateFavorites()
  }

  onButtonClick(): void {
    runInInjectionContext(this.injector, () =>
      inject(AuthStore).logout()
    )

  }



}
