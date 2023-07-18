import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OtpFormTemplateComponent } from '../otp-form-template/otp-form-template.component';

export enum MessageType {
  EMAIL = "Email",
  SMS = "SMS"
}

export interface ContactSubmitEvent {
  type: MessageType
  value: string
}

@Component({
  selector: 'to-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    OtpFormTemplateComponent
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ContactFormComponent implements OnInit {

  @Input({ required: true }) type!: MessageType

  @Input() label!: string

  @Output() contactSubmit: EventEmitter<ContactSubmitEvent> = new EventEmitter();

  protected formControl!: FormControl<string>

  constructor(
    private nfb: NonNullableFormBuilder,
  ) { }

  ngOnInit(): void {
    this.formControl = this._getContactControl();
    this.label = this.label || this._getLabel();
    console.log(this.type)
  }

  private _getContactControl(): FormControl<string> {
    return this.type === MessageType.EMAIL ? this._getEmailForm() : this._getPhoneNumberForm()
  }

  private _getPhoneNumberForm(): FormControl<string> {
    // return this.nfb.control('', [Validators.required])
    return this.nfb.control('')
  }

  private _getEmailForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required, Validators.email])
  }

  private _getLabel(): string {
    return this.type === MessageType.EMAIL ? 'Email Address' : 'Phone Number'
  }


  protected onSubmit(type: MessageType, value: string): void {
    const event: ContactSubmitEvent = { type, value }
    this.contactSubmit.emit(event)
  }


}
