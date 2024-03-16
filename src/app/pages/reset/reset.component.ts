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
import {
  ResetContactFormComponent,
  ResetPasswordFormComponent,
} from "src/app/auth";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { CardButtonComponent } from "src/app/shared/components/card-button/card-button.component";

@Component({
  selector: "to-reset",
  standalone: true,
  imports: [
    ResetContactFormComponent,
    ResetPasswordFormComponent,
    CardButtonComponent,
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
