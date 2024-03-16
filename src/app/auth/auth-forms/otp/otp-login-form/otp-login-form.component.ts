import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  signal,
} from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  ContactFormComponent,
  ContactSubmitEvent,
  MessageType,
} from "../otp-contact-form/otp-contact-form.component";
import { OtpFormComponent } from "../otp-form/otp-form.component";
import { SignInEvent } from "src/app/auth/utils/auth.model";

interface Tab {
  icon: string;
  label: string;
  type: MessageType;
}

@Component({
  selector: "to-otp-login-form",
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    ContactFormComponent,
    OtpFormComponent,
  ],
  templateUrl: "./otp-login-form.component.html",
  styleUrls: ["./otp-login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpLoginFormComponent {
  protected readonly tabs: Tab[] = [
    { icon: "sms", label: "SMS", type: MessageType.SMS },
    { icon: "mail", label: "Email", type: MessageType.EMAIL },
  ];

  protected selectedIndex: WritableSignal<number> = signal(0);

  protected contactEvent!: ContactSubmitEvent;

  @Output() otpSignIn: EventEmitter<SignInEvent> = new EventEmitter();
  @Output() signInWithEmailAndPassword: EventEmitter<void> = new EventEmitter();

  onSendOPT(event: ContactSubmitEvent) {
    this.contactEvent = event;
    this._changeStep();
  }

  private _changeStep() {
    this.selectedIndex.update(() => 1);
  }

  protected onEmailAndPassword() {
    this.signInWithEmailAndPassword.emit();
  }
}
