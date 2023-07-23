import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, getDocs, query, limit } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Vacation } from './store/vacation.model';



@Injectable({
  providedIn: 'root'
})

export class VacationsService {

  private readonly vacationsRef: CollectionReference<Vacation>;
  private readonly VACATIONS_COLLECTION = 'vacations';

  constructor(
    private readonly firestore: Firestore
  ) {
    this.vacationsRef = collection(this.firestore, this.VACATIONS_COLLECTION) as CollectionReference<Vacation>
  }

  getVacations$(): Observable<Vacation[]> {
    const queryRef = query(this.vacationsRef, limit(4));
    return from(getDocs(queryRef)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, } as Vacation
      }))
    );
  };


}
