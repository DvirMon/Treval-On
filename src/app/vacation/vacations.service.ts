import { Injectable } from '@angular/core';
import { Firestore, CollectionReference, DocumentData, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vacation } from '../store/vacations/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private readonly vacationsCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore
  ) {
    this.vacationsCollection = collection(this.firestore, 'vacations')
  }


  getVacations$(): Observable<Vacation[]> {
    return collectionData(this.vacationsCollection, { idField: 'id' }) as Observable<Vacation[]>;
  }


}
