import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { SignInEvent, SignInMethod } from '../store/auth.model';



@Component({
  selector: 'to-email-link-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule
  ],
  templateUrl: './email-link-form.component.html',
  styleUrls: ['./email-link-form.component.scss']
})
export class EmailLinkFormComponent {

  @Output() contactSubmit: EventEmitter<SignInEvent> = new EventEmitter();

  protected formControl!: FormControl<string>



  protected onSubmit(value: string): void {
    const event: SignInEvent = { method: SignInMethod.EMAIL_LINK, data: value }
    this.contactSubmit.emit(event)
  }

}
