import { JsonPipe, TitleCasePipe } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/components/form-input/form-input.component";

@Component({
  selector: "to-reset-password-form",
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
  templateUrl: "./reset-password-form.component.html",
  styleUrl: "./reset-password-form.component.scss",
})
export class ResetPasswordFormComponent {}
