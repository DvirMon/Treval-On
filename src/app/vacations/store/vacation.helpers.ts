import { Places } from "./vacation.model";


export function selectUserId(vacation: Places): string {
  //In this case this would be optional since primary key is id
  return vacation.id;
}

// export function sortByDestination(a: Places, b: Places): number {
//   return a.destination.localeCompare(b.destination);
// }
