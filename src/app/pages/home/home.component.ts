import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection, CollectionReference, DocumentData, DocumentReference, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VACATIONS_DATA } from 'src/assets/MOCK_DATA';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { Store } from '@ngrx/store';



@Component({
  selector: 'to-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private readonly firestore: Firestore = inject(Firestore);
  private readonly vacationsCollection: CollectionReference<DocumentData>;
  protected readonly vacations$: Observable<Vacation[]>;


  private readonly store : Store = inject(Store);

  constructor() {
    this.vacationsCollection = collection(this.firestore, 'vacations')
    this.vacations$ = collectionData(this.vacationsCollection, { idField: 'id' }) as Observable<Vacation[]>;
  }

  readonly vacations = VACATIONS_DATA


  ngOnInit() {
  }
}
