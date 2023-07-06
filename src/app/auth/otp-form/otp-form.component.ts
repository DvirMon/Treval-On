import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ContactFormComponent, MessageType } from '../contact-form/contact-form.component';

interface Tab {
  icon: string;
  label: string;
  type: MessageType;
}

@Component({
  selector: 'to-otp-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ContactFormComponent

  ],
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent {

  tabs: Tab[] = [
    { icon: 'sms', label: 'SMS', type: MessageType.SMS },
    { icon: 'mail', label: 'Email', type: MessageType.Email }
  ];


  phoneOtp: MessageType = MessageType.SMS
  emailOtp: MessageType = MessageType.Email


  phoneNumberForm: FormControl<string>;
  otpForm: FormControl<string>;

  showOtp: boolean = false;

  constructor(
    private nfb: NonNullableFormBuilder,
    private http: HttpClient
  ) {


    this.phoneNumberForm = this.createPhoneNumberForm();
    this.otpForm = this.createOTPForm();

  }

  private createPhoneNumberForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required])
  }

  private createOTPForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required])

  }

  onPhoneNumberSubmit(): void {
    if (this.phoneNumberForm && this.phoneNumberForm.valid) {
      const phoneNumber: string = this.phoneNumberForm.value;

      this.sendPhoneNumber(phoneNumber).subscribe(response => {
        // Perform necessary actions with the response
        // ...

        // Move to the next step (OTP input)
        // For example, you can navigate to the next form or show/hide UI components
      });
    }
  }

  onOTPSubmit(): void {
    if (this.otpForm && this.otpForm.valid) {
      const otp: string = this.otpForm.value

      this.sendOTP(otp).subscribe(response => {
        // Perform necessary actions with the response
        // ...

        // Submit the complete form or perform final actions
      });
    }
  }

  private sendPhoneNumber(phoneNumberData: string) {
    const url = 'api/phone-number-endpoint';
    return this.http.post(url, phoneNumberData).pipe(
      tap(response => {
        // Perform any side-effects if needed
      })
    );
  }

  private sendOTP(otpData: string) {
    const url = 'api/otp-endpoint';
    return this.http.post(url, otpData).pipe(
      tap(response => {
        // Perform any side-effects if needed
      })
    );
  }
}
