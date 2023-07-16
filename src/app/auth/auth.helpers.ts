import { Observable, OperatorFunction } from 'rxjs';
import {
  UserCredential,
  User as UserFirebase,
} from '@angular/fire/auth';
import { User } from './store/auth.model';
import { map } from 'rxjs/operators';

export function mapUserCredentials(): OperatorFunction<UserCredential, User> {
  return (source: Observable<UserCredential>): Observable<User> =>
    source.pipe(
      map((credential: UserCredential) => credential.user),
      map((userFirebase: UserFirebase) => {
        const user = mapUser(userFirebase); // Replace with your _mapUser logic
        return user;
      })
    );
}

function mapUser(user: UserFirebase): User {
  return {
    id: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  } as User
}
