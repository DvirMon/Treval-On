import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Signal,
  inject,
  input,
  runInInjectionContext,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Data } from "@angular/router";
import { map } from "rxjs";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { FloatingButtonComponent } from "src/app/shared/components/floating-button/floating-button.component";
import { FavoriteStore } from "src/app/favorites/favorite.store.service";
import { Places } from "src/app/vacations/store/vacation.model";
import { VacationsStore } from "src/app/vacations/store/vacations.store.service";
import {
  PlacesListComponent,
  SelectionListChange,
} from "src/app/vacations/vacation-list/vacation-list.component";

@Component({
  selector: "to-places",
  standalone: true,
  imports: [CommonModule, PlacesListComponent, FloatingButtonComponent],
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesComponent {
  userId = input<string>;
  private readonly injector = inject(Injector);

  private readonly favoriteStore: FavoriteStore = inject(FavoriteStore);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly vacations: Signal<Places[]>;
  protected readonly selection: Signal<Record<string, boolean>>;

  constructor() {
    this.vacations = inject(VacationsStore).getVacations();
    this.selection = this._getSelectionFroRoute();
  }

  private _getSelectionFroRoute(): Signal<Record<string, boolean>> {
    return toSignal(
      this.route.data.pipe(map((data: Data) => data["placesResolver"])),
      { initialValue: {} }
    );
  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.favoriteStore.updateSelection(selection);
    this.favoriteStore.updateFavorites();
  }

  onButtonClick(): void {
    runInInjectionContext(this.injector, () => inject(AuthStore).logout());
  }
}
