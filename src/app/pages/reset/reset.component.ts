import { JsonPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Signal,
  computed,
  inject,
  runInInjectionContext,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { ResetContactFormComponent } from "src/app/auth/reset/reset-contact-form/reset-contact-form.component";
import { ResetPasswordFormComponent } from "src/app/auth/reset/reset-password-form/reset-password-form.component";

@Component({
  selector: "to-reset",
  standalone: true,
  imports: [
    JsonPipe,
    ResetContactFormComponent,
    ResetPasswordFormComponent,
    AuthActionComponent,
  ],
  templateUrl: "./reset.component.html",
  styleUrl: "./reset.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPageComponent {
  #injector = inject(Injector);
  #store = inject(Store);
  #activatedRoute = inject(ActivatedRoute);

  public readonly paramsSignal: Signal<Params>;

  public readonly showNewPassword: Signal<boolean>;

  constructor() {
    this.paramsSignal = toSignal(this.#activatedRoute.queryParams, {
      initialValue: { mode: "" } as Params,
    });

    this.showNewPassword = computed(() => !!this.paramsSignal()["mode"]);
  }

  public onSendLink(email: string) {
    runInInjectionContext(this.#injector, () => {
      inject(Router).navigateByUrl(
        "reset?mode=resetPassword&oobCode=gWBFAp0v3FTiDu8tbLLudvfqddTZ3_jEmiB0y2kqLz4AAAGOHee8YA & apiKey=AIzaSyAWE61Vm0CpfUtHq4G48aJVMbdY6REEtrA & lang=en"
      );
    });
  }

  public onResetPassword(newPassword: string) {
    const oobCode = this.paramsSignal()["oobCode"];
    console.log(newPassword);
    console.log(oobCode);

    runInInjectionContext(this.#injector, () => {
      inject(Router).navigateByUrl("reset");
    });
  }
}
