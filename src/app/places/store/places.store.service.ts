import { Injectable, Signal } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, switchMap, tap } from "rxjs";
import { PlacesActions } from "./places.actions";
import { Places } from "./places.model";
import { PlacesSelectors } from "./places.selectors";

@Injectable({
  providedIn: "root",
})
export class VacationsStore {
  private readonly vacationLoaded: Signal<boolean>;
  private readonly vacations: Signal<Places[]>;

  constructor(private store: Store) {
    this.vacationLoaded = this.store.selectSignal(
      PlacesSelectors.selectPlacesLoaded
    );
    this.vacations = this.store.selectSignal(PlacesSelectors.selectPlaces);
  }

  public getPlaces() {
    if (!this.vacationLoaded()) {
      this.store.dispatch(PlacesActions.loadPlaces());
    }
    return this.vacations;
  }
}
