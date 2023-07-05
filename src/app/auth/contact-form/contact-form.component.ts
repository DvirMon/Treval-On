import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

export enum MessageType {
  Email = 'Email',
  SMS = 'SMS',
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

  protected readonly formControl: FormControl<string> = new FormControl();

  ngOnInit(): void {
    this.contactType = this.contactType || this._getContactType()
    this.label = this.label || this._getLabel()
  }

  private _getContactType(): string {
    return this.type === MessageType.Email ? 'Email' : 'SMS'
  }
  private _getLabel(): string {
    return this.type === MessageType.Email ? 'Email Address' : 'Phone Number'
  }


  public onSubmit() { }

}
