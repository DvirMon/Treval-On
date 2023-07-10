import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ContactSubmitEvent, MessageType } from '../contact-form/contact-form.component';
import { CodeInputModule } from 'angular-code-input';
import { OtpFormTemplateComponent } from '../otp-form-template/otp-form-template.component';

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
    CodeInputModule,
    OtpFormTemplateComponent

  ],
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OtpFormComponent {

  @Input() contactEvent!: ContactSubmitEvent


  protected icon!: string

  ngOnInit(): void {
    this.icon = this.contactEvent?.type || 'security_update_good'
  }


  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }
}
