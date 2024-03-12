import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Signal,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Params } from "@angular/router";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { ResetContactFormComponent } from "src/app/auth/reset/reset-contact-form/reset-contact-form.component";
import { ResetPasswordFormComponent } from "src/app/auth/reset/reset-password-form/reset-password-form.component";
import { AuthStore } from "src/app/auth/store/auth.store.service";

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
export class ResetPageComponent {
  #injector = inject(Injector);
  #authStore = inject(AuthStore);
  #activatedRoute = inject(ActivatedRoute);

  public readonly paramsSignal: Signal<Params>;

  public readonly showNewPassword: Signal<boolean>;

  constructor() {
    this.paramsSignal = toSignal(this.#activatedRoute.queryParams, {
      initialValue: { mode: "" } as Params,
    });

    this.showNewPassword = computed(() => !!this.paramsSignal()["mode"]);
  }

  public onResetEmail(email: string) {
    // runInInjectionContext(this.#injector, () => {
    //   inject(Router).navigateByUrl(
    //     "reset?mode=resetPassword&oobCode=gWBFAp0v3FTiDu8tbLLudvfqddTZ3_jEmiB0y2kqLz4AAAGOHee8YA & apiKey=AIzaSyAWE61Vm0CpfUtHq4G48aJVMbdY6REEtrA & lang=en"
    //   );
    // });

    this.#authStore.sendResetEmail(email);
  }

  public onResetPassword(newPassword: string) {
    const oobCode = this.paramsSignal()["oobCode"];
    // this.#authStore.confirmResetPassword(newPassword, oobCode);
    this.#authStore.sendResetEmail("email");

    // runInInjectionContext(this.#injector, () => {
    //   inject(Router).navigateByUrl("reset");
    // });
  }
}
