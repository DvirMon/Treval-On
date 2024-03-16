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
import { FavoriteStore } from "src/app/store/favorites/favorite.store.service";
import {
  PlacesListComponent,
  SelectionListChange,
} from "src/app/places/place-list/place-list.component";
import { Places } from "src/app/store/places/places.model";
import { VacationsStore } from "src/app/store/places/places.store.service";
import { FloatingButtonComponent } from "src/app/shared/components/floating-button/floating-button.component";

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

  protected readonly places: Signal<Places[]>;
  protected readonly selection: Signal<Record<string, boolean>>;

  constructor() {
    this.places = inject(VacationsStore).getPlaces();
    this.selection = this._getSelectionFromRoute();
  }

  private _getSelectionFromRoute(): Signal<Record<string, boolean>> {
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
