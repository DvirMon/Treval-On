import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FireAuthService } from "../../utils/fireauth.service";

@Injectable({
  providedIn: "root",
})
export class ResetService {
  constructor(private readonly fireAuthService: FireAuthService) {}

  public sendResetEmail(email: string): Observable<void> {
    return this.fireAuthService.sendPasswordResetEmail(email);
  }
  public confirmPasswordReset(
    oobCode: string,
    newPassword: string
  ): Observable<void> {
    return this.fireAuthService.confirmPasswordReset(oobCode, newPassword);
  }
}
