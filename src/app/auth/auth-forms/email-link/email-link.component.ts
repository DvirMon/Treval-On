import { CommonModule, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Output,
  inject,
} from "@angular/core";
import {
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { DividerHeaderComponent } from "src/app/shared/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/shared/components/form-input/form-input.component";
import { SignInEvent, SignInMethod } from "../../index";
import { InfoCardComponent } from "src/app/shared/components/info-card/info-card.component";

@Component({
  selector: "to-email-link-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DividerHeaderComponent,
    InfoCardComponent,
    FormInputComponent,
  ],
  templateUrl: "./email-link.component.html",
  styleUrls: ["./email-link.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLinkFormComponent {
  private readonly injector = inject(Injector);
  public readonly formControl: FormControl<string>;

  @Output() emailLinkSignIn: EventEmitter<SignInEvent> = new EventEmitter();

  constructor() {
    this.formControl = this._getEmailControl();
  }

  private _getEmailControl(): FormControl<string> {
    return inject(NonNullableFormBuilder).control("dmenajem@gmail.com", [
      Validators.required,
      Validators.email,
    ]);
  }

  public onSubmit(value: string): void {
    const event: SignInEvent = { method: SignInMethod.EMAIL_LINK, data: value };
    this.emailLinkSignIn.emit(event);
  }
}
