import { createReducer, on } from "@ngrx/store";
import { PlacesActions } from "./places.actions";
import { initialState, adapter } from "./places.state";
import { AuthActions } from "src/app/auth/store/auth.actions";

export const placesReducer = createReducer(
  initialState,
  on(PlacesActions.loadPlaces, (state) => state),

  on(PlacesActions.loadPlacesSuccess, (state, action) => ({
    ...adapter.setAll(action.places, state),
    loaded: true,
  })),

  on(PlacesActions.addPlaces, (state, action) =>
    adapter.addOne(action.place, state)
  ),

  on(PlacesActions.updatePlaces, (state, action) =>
    adapter.updateOne(action.place, state)
  ),
  on(PlacesActions.deletePlaces, (state, action) =>
    adapter.removeOne(action.id, state)
  ),

  on(AuthActions.logout, () => ({
    ...initialState,
  }))
);
