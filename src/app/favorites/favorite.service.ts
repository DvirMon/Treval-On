import { Injectable } from "@angular/core";
import {
  CollectionReference,
  QuerySnapshot,
  getDocs,
  where,
  doc,
  updateDoc,
  DocumentData,
  addDoc,
  Firestore,
  collection,
  query,
  Timestamp,
  DocumentReference,
} from "@angular/fire/firestore";
import { Favorite } from "./store/favorite.model";
import { mapQuerySnapshotDoc } from "../utils/helpers";
import { Observable, from, switchMap, iif, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private readonly FAVORITES_COLLECTION = "favorites";
  private readonly favoritesRef: CollectionReference<Favorite>;

  constructor(private readonly firestore: Firestore) {
    this.favoritesRef = collection(
      this.firestore,
      this.FAVORITES_COLLECTION
    ) as CollectionReference<Favorite>;
  }

  getFavorite$(userId: string): Observable<Favorite> {
    const querySnapshot$ = from(
      getDocs(query(this.favoritesRef, where("userId", "==", userId)))
    );

    const trueResult$ = querySnapshot$.pipe(
      switchMap(() =>
        this._createNewFavoriteDocument$(this.favoritesRef, userId)
      )
    );

    const falseResult$ = querySnapshot$.pipe(mapQuerySnapshotDoc<Favorite>());

    return querySnapshot$.pipe(
      switchMap((querySnapshot: QuerySnapshot<Favorite>) =>
        iif(() => querySnapshot.empty, trueResult$, falseResult$)
      )
    );
  }

  private _createNewFavoriteDocument$(
    favoritesRef: CollectionReference<DocumentData>,
    userId: string
  ): Observable<Favorite> {
    const newFavorite: Partial<Favorite> = {
      userId,
      vacationIds: [],
      createdAt: Timestamp.fromDate(new Date()),
    };
    return from(addDoc(favoritesRef, newFavorite)).pipe(
      switchMap((doc: DocumentReference<DocumentData>) => {
        return of({ ...newFavorite, id: doc.id } as Favorite);
      })
    );
  }

  private getFavoriteQuerySnapshot$(
    userId: string
  ): Observable<QuerySnapshot<Favorite>> {
    return from(
      getDocs(query(this.favoritesRef, where("userId", "==", userId)))
    );
  }

  public updateFavorite$ = (
    userId: string,
    vacationIds: string[]
  ): Observable<void> => {
    const querySnapshot$: Observable<QuerySnapshot<Favorite>> =
      this.getFavoriteQuerySnapshot$(userId);

    return querySnapshot$.pipe(
      switchMap((querySnapshot: QuerySnapshot<Favorite>) =>
        this._updateFavoriteDocument$(
          this.favoritesRef,
          querySnapshot,
          vacationIds
        )
      )
    );
  };

  private _updateFavoriteDocument$(
    favoritesRef: CollectionReference<Favorite>,
    querySnapshot: QuerySnapshot<Favorite>,
    vacationIds: string[]
  ): Observable<void> {
    const favoriteDoc: Favorite = querySnapshot.docs[0].data();
    const favoriteDocId: string = querySnapshot.docs[0].id;
    const favoriteDocRef = doc(favoritesRef, favoriteDocId);

    const updatedFavorite = {
      ...favoriteDoc,
      vacationIds: [...favoriteDoc.vacationIds, ...vacationIds],
      id: favoriteDocId,
    };
    return from(updateDoc(favoriteDocRef, updatedFavorite));
  }
}
