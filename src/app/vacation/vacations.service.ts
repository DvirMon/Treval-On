import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, collection, addDoc, getDocs, query, limit } from '@angular/fire/firestore';
import { Observable, from, map, tap } from 'rxjs';
import { Vacation } from '../store/vacations/vacation.model';
import { VACATIONS_DATA } from 'src/assets/MOCK_DATA';



@Injectable({
  providedIn: 'root'
})

export class VacationService {

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
