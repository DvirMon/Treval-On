import { JsonPipe, TitleCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Signal,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/components/form-input/form-input.component";
import { getFormKeys } from "src/app/components/form-input/form.helper";
import { EmailAndPasswordSignIn } from "../../store/auth.model";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { patchState, signalState } from "@ngrx/signals";

interface ResetForm {
  email: FormControl<string>;
}

type ResetCredentials = { mode: string; oobCode: string };

@Component({
  selector: "to-reset-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    JsonPipe,
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    FormInputComponent,
    DividerHeaderComponent,
  ],
  templateUrl: "./reset-form.component.html",
  styleUrl: "./reset-form.component.scss",
})
export class ResetFormComponent implements OnInit {
  #activeRoute = inject(ActivatedRoute);

  public readonly resetFormGroup: FormGroup<ResetForm>;
  public readonly formKeys: WritableSignal<string[]>;

  public resetCredentials = signalState<ResetCredentials>({
    mode: "",
    oobCode: "",
  });

  @Output() resetPassword: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.resetFormGroup = this._buildResetForm();
    this.formKeys = getFormKeys(this.resetFormGroup);
  }

  ngOnInit(): void {
    const params: ParamMap = this.#activeRoute.snapshot.queryParamMap;

    params.keys.forEach((key: string) => {

      patchState(this.resetCredentials, { [key]: params.get(key) });
    });

  }

  private _buildResetForm(): FormGroup<ResetForm> {
    return inject(NonNullableFormBuilder).group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public onSubmit(value: Partial<EmailAndPasswordSignIn>): void {
    this.resetPassword.emit(value as string);
  }
}

// http://localhost:4200/reset?mode=resetPassword&oobCode=
// gWBFAp0v3FTiDu8tbLLudvfqddTZ3_jEmiB0y2kqLz4AAAGOHee8YA & apiKey=AIzaSyAWE61Vm0CpfUtHq4G48aJVMbdY6REEtrA & lang=en
