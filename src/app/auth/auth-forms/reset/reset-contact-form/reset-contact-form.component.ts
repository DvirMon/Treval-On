import { JsonPipe, TitleCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  inject,
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
import { MatIcon } from "@angular/material/icon";
import { DividerHeaderComponent } from "src/app/shared/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/shared/components/form-input/form-input.component";
import { getFormKeys } from "src/app/shared/components/form-input/form.helper";
import { DEFAULT_EMAIL } from "src/app/shared/constants";

interface ResetContactForm {
  email: FormControl<string>;
}

@Component({
  selector: "to-reset-contact-form",
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
  templateUrl: "./reset-contact-form.component.html",
  styleUrl: "./reset-contact-form.component.scss",
})
export class ResetContactFormComponent {
  public readonly resetFormGroup: FormGroup<ResetContactForm>;
  public readonly formKeys: WritableSignal<string[]>;

  @Output() resetEmail: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.resetFormGroup = this._buildResetForm();
    this.formKeys = getFormKeys(this.resetFormGroup);
  }

  private _buildResetForm(): FormGroup<ResetContactForm> {
    return inject(NonNullableFormBuilder).group({
      email: [DEFAULT_EMAIL, [Validators.required, Validators.email]],
    });
  }

  public onSubmit(value: Partial<{ email: string }>): void {
    this.resetEmail.emit(value.email as string);
  }
}
