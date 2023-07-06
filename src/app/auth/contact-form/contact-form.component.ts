import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

export enum MessageType {
  Email = 'Email',
  SMS = 'SMS',
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
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input({ required: true }) type!: MessageType

  @Input() contactType!: string
  @Input() label!: string

  @Output() submit: EventEmitter<ContactSubmitEvent> = new EventEmitter();

  protected formControl!: FormControl<string>

  constructor(
    private nfb: NonNullableFormBuilder,
  ) { }

  ngOnInit(): void {
    this.formControl = this._getContactControl();
    this.contactType = this.contactType || this._getContactType();
    this.label = this.label || this._getLabel();
  }

  private _getContactControl(): FormControl<string> {
    return this.type === MessageType.Email ? this._getEmailForm() : this._getPhoneNumberForm()
  }

  private _getPhoneNumberForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required])
  }

  private _getEmailForm(): FormControl<string> {
    return this.nfb.control('', [Validators.required, Validators.email])

  }

  private _getContactType(): string {
    return this.type === MessageType.Email ? 'Email' : 'SMS'
  }
  private _getLabel(): string {
    return this.type === MessageType.Email ? 'Email Address' : 'Phone Number'
  }


  protected onSubmit(type: MessageType, value: string): void {
    const event: ContactSubmitEvent = { type, value }
    this.submit.emit(event)
  }


}
