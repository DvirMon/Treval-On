import { Injectable } from "@angular/core";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Observable, from, iif, of, switchMap } from "rxjs";
import { mapQuerySnapshotDoc } from "../../shared/helpers";
import { Favorite } from "./favorite.model";

@Injectable({
  providedIn: "root",
})
export class FavoriteHttpService {
  private readonly FAVORITES_COLLECTION = "favorites";
  private readonly favoritesRef: CollectionReference<Favorite>;

  constructor(private readonly firestore: Firestore) {
    this.favoritesRef = collection(
      this.firestore,
      this.FAVORITES_COLLECTION
    ) as CollectionReference<Favorite>;
  }

  public getFavorite$(userId: string): Observable<Favorite> {
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
