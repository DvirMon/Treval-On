import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'to-otp-form-template',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './otp-form-template.component.html',
  styleUrls: ['./otp-form-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OtpFormTemplateComponent {

}
