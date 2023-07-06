import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactFormComponent, MessageType } from '../contact-form/contact-form.component';
import { OtpFormComponent } from '../otp-form/otp-form.component';
import { MatIconModule } from '@angular/material/icon';

interface Tab {
  icon: string;
  label: string;
  type: MessageType;
}

@Component({
  selector: 'to-login-otp-form',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatTabsModule, MatIconModule, ContactFormComponent, OtpFormComponent],
  templateUrl: './login-otp-form.component.html',
  styleUrls: ['./login-otp-form.component.scss']
})
export class LoginOtpFormComponent {

  protected readonly tabs: Tab[] = [
    { icon: 'sms', label: 'SMS', type: MessageType.SMS },
    { icon: 'mail', label: 'Email', type: MessageType.Email }
  ];

  protected selectedIndex: WritableSignal<number> = signal(1);


  onChangeStep(selectedIndex : number) {
    this.selectedIndex.update(() => selectedIndex)
  }

}
