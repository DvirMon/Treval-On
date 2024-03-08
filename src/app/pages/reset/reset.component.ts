import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { patchState, signalState } from "@ngrx/signals";
import { SignalState } from "@ngrx/signals/src/signal-state";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { ResetContactFormComponent } from "src/app/auth/reset/reset-contact-form/reset-contact-form.component";
import { ResetPasswordFormComponent } from "src/app/auth/reset/reset-password-form/reset-password-form.component";

type ResetCredentials = { mode: string; oobCode: string };

@Component({
  selector: "to-reset",
  standalone: true,
  imports: [
    ResetContactFormComponent,
    ResetPasswordFormComponent,
    AuthActionComponent,
  ],
  templateUrl: "./reset.component.html",
  styleUrl: "./reset.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPageComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);

  public resetCredentials = signalState<ResetCredentials>({
    mode: "",
    oobCode: "",
  });

  ngOnInit(): void {
    this.updateFromUrl(this.resetCredentials, this.#activatedRoute);
  }

  private updateFromUrl(
    cred: SignalState<ResetCredentials>,
    activatedRoute: ActivatedRoute
  ) {
    const params: ParamMap = activatedRoute.snapshot.queryParamMap;

    params.keys.forEach((key: string) => {
      if (Object.hasOwn(cred(), key)) {
        patchState(cred, { [key]: params.get(key) });
      }
    });
  }
}
