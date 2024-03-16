import { Update } from "@ngrx/entity";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Places } from "./places.model";

export const PlacesActions = createActionGroup({
  source: "Places/API",
  events: {
    "Load Places": emptyProps(),
    "Load Places Success": props<{ places: Places[] }>(),
    "Load Places Failure": props<{ error: unknown }>(),
    "Add Places": props<{ place: Places }>(),
    "Update Places": props<{ place: Update<Places> }>(),
    "Delete Places": props<{ id: string }>(),
    "Clear Places": emptyProps(),
  },
});
