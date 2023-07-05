import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'to-otp-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent {

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

  // ngOnInit(): void {
  //   this.buildPhoneNumberForm();
  //   this.buildOTPForm();
  // }

  // private buildPhoneNumberForm(): void {
  // }

  private createPhoneNumberForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required])
  }

  // private buildOTPForm(): void {
  // }

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
