import { Timestamp } from '@angular/fire/firestore';

export interface Destination {
  city : string,
  country : string,
}

export interface Places {
  id: string,
  destination: Destination,
  price: number,
  takeoff :  Timestamp,
  landing: Timestamp,
  imageUrl: string
}
