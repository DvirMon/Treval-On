import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { MessageType } from '../contact-form/contact-form.component';
import { CodeInputModule } from 'angular-code-input';

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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CodeInputModule

  ],
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss']
})
export class OtpFormComponent {

  protected readonly tabs: Tab[] = [
    { icon: 'sms', label: 'SMS', type: MessageType.SMS },
    { icon: 'mail', label: 'Email', type: MessageType.Email }
  ];



  constructor(
  ) {


  }

 // this called only if user entered full code
 onCodeCompleted(code: string) {
}
}
