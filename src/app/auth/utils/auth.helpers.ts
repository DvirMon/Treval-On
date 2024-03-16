import { Location } from "@angular/common";
import { Injector, inject, runInInjectionContext } from "@angular/core";
import { UserCredential, User as UserFirebase } from "@angular/fire/auth";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";
import { FormServerError } from "../../shared/components/form-input/form.helper";
import { AuthEvent, AuthServerError, User } from "./auth.model";

// Function to generate a valid URL for the email verification link
export function generateVerificationLink(
  injector: Injector,
  param?: Params
): string {
  return runInInjectionContext(injector, () => {
    const baseUrl = inject(Location).normalize(location.origin);

    // Create the URL tree with the desired route and any necessary query parameters
    const urlTree = inject(Router).createUrlTree(["/verify-email"], {
      queryParams: { token: "verification_token", ...param },
    });

    // Convert the URL tree to a string
    const url = inject(Router).serializeUrl(urlTree);

    const verificationLink = baseUrl + url;

    return verificationLink;
  });
}

export function getUserEmailFromUrl(
  injector: Injector,
  param: string
): string | null {
  const activatedRoute = inject(ActivatedRoute);
  return runInInjectionContext(injector, () =>
    activatedRoute.snapshot.queryParamMap.get(param)
  );
}

export function mapFirebaseCredentials(): OperatorFunction<
  UserCredential,
  User
> {
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
    userId: user.uid,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  } as User;
}

export function mapAuthServerError(
  code: string,
  event: AuthEvent
): AuthServerError {
  const authErrorMessages: { [errorCode: string]: FormServerError } = {
    "auth/user-not-found": {
      control: "email",
      message: "This email is not register.",
    },

    "auth/email-already-in-use": {
      control: "email",
      message: "This email is already exist.",
    },

    "auth/invalid-email": {
      control: "email",
      message: "The email address is not valid.",
    },
    "auth/invalid-password": {
      control: "password",
      message: "The password is not valid.",
    },
    "auth/missing-password": {
      control: "password",
      message: "The password is not valid.",
    },
    "auth/wrong-password": {
      control: "password",
      message: "Password is not match.",
    },
  };

  return { event, ...authErrorMessages[code] };
}
