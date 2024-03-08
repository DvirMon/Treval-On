import { TitleCasePipe } from "@angular/common";
import { Component, EventEmitter, Output, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/components/form-input/form-input.component";
import { getFormKeys } from "src/app/components/form-input/form.helper";
import { EmailAndPasswordSignIn } from "../../store/auth.model";
import { MatIcon } from "@angular/material/icon";

interface ResetForm {
  email: FormControl<string>;
}

@Component({
  selector: "to-reset-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
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
export class ResetFormComponent {
  protected readonly resetFormGroup: FormGroup<ResetForm>;

  public formKeys: string[] = [];

  @Output() resetPassword: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.resetFormGroup = this._buildResetForm();
    this.formKeys = getFormKeys(this.resetFormGroup);
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
