import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {
  ContactSubmitEvent,
  MessageType,
} from "../otp-contact-form/otp-contact-form.component";
import { CodeInputModule } from "angular-code-input";
import { OtpFormTemplateComponent } from "../otp-form-template/otp-form-template.component";

@Component({
  selector: "to-otp-form",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CodeInputModule,
    OtpFormTemplateComponent,
  ],
  templateUrl: "./otp-form.component.html",
  styleUrls: ["./otp-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpFormComponent implements OnInit {
  @Input() contactEvent!: ContactSubmitEvent;

  protected icon!: string;

  ngOnInit(): void {
    this.icon = this._getIcon(this.contactEvent.type);
  }

  _getIcon(type: MessageType): string {
    if (type === undefined) return "security_update_good";

    return type === MessageType.EMAIL ? "mail" : "sms";
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    console.log(code);
  }
}
