import { Places } from "./places.model";

export function selectUserId(place: Places): string {
  //In this case this would be optional since primary key is id
  return place.id;
}
