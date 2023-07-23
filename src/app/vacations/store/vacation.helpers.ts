import { Vacation } from "./vacation.model";


export function selectUserId(vacation: Vacation): string {
  //In this case this would be optional since primary key is id
  return vacation.id;
}

export function sortByDestination(a: Vacation, b: Vacation): number {
  return a.destination.localeCompare(b.destination);
}
