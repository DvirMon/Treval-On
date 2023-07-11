import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, DocumentData, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacation } from '../store/vacations/vacation.model';
import { VACATIONS_DATA } from 'src/assets/MOCK_DATA';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private readonly vacationsCollection: CollectionReference<DocumentData>;

  mock_vacations: Vacation[] = VACATIONS_DATA

  constructor(
    private readonly firestore: Firestore
  ) {
    this.vacationsCollection = collection(this.firestore, 'vacations')
  }


  getVacations$(): Observable<Vacation[]> {
    return collectionData(this.vacationsCollection, { idField: 'id' }) as Observable<Vacation[]>;
  }

  addVacation() :void {

    this.mock_vacations.forEach((value: Vacation) => {
      addDoc(this.vacationsCollection, value)
    })

  }
}
