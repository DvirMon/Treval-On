import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent, MessageType } from '../contact-form/contact-form.component';

@Component({
  selector: 'to-email-link-form',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './email-link-form.component.html',
  styleUrls: ['./email-link-form.component.scss']
})
export class EmailLinkFormComponent {

  type: MessageType = MessageType.EMAIL

}
