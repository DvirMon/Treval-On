import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'to-register-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush

})
export class RegisterFormComponent {

}
