
export interface Destination {
  city : string,
  country : string,
}

export interface Vacation {
  id: string,
  destination: Destination,
  price: number,
  takeoff : Date,
  landing: Date,
  imageUrl: string
}
