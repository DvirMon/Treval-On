import { Injectable } from '@angular/core';
import { CollectionReference, QuerySnapshot, getDocs, where, doc, updateDoc, DocumentData, addDoc, Firestore, collection, query } from '@angular/fire/firestore';
import { Observable, from, switchMap, iif, map } from 'rxjs';

interface Favorite {
  userId: string;
  vacationIds: string[];
}



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly FAVORITES_COLLECTION = 'favorites';
  private readonly favoritesRef: CollectionReference<Favorite>

  constructor(
    private readonly firestore: Firestore

  ) {
    this.favoritesRef = collection(this.firestore, this.FAVORITES_COLLECTION) as CollectionReference<Favorite>
  }

  getUserFavoriteVacations$(userId: string): Observable<QuerySnapshot<Favorite>> {
    return from(getDocs(query(this.favoritesRef, where('userId', '==', userId))));
  }

  updateFavoriteVacations$ = (userId: string, vacationIds: string[]): Observable<void> => {

    const querySnapshot$: Observable<QuerySnapshot<Favorite>> = this.getUserFavoriteVacations$(userId)

    return querySnapshot$.pipe(
      switchMap((querySnapshot: QuerySnapshot<Favorite>) => iif(
        () => !querySnapshot.empty,
        this._updateFavoriteDocument$(this.favoritesRef, querySnapshot, vacationIds),
        this._createNewFavoriteDocument$(this.favoritesRef, userId, vacationIds)
      ))
    );
  };

  private _updateFavoriteDocument$ = (favoritesRef: CollectionReference<Favorite>, querySnapshot: QuerySnapshot<Favorite>, vacationIds: string[]): Observable<void> => {
    const favoriteDocId: string = querySnapshot.docs[0].id;
    const favoriteDocRef = doc(favoritesRef, favoriteDocId);

    const updatedFavorite: Favorite = { userId: favoriteDocId, vacationIds };
    return from(updateDoc(favoriteDocRef, updatedFavorite));
  };

  private _createNewFavoriteDocument$ = (favoritesRef: CollectionReference<DocumentData>, userId: string, vacationIds: string[]): Observable<void> => {
    const newFavorite: Favorite = { userId, vacationIds };
    return from(addDoc(favoritesRef, newFavorite)).pipe(map(() => { }));
  };
}
