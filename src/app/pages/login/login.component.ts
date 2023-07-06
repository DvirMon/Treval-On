import { ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { LoginOtpFormComponent } from 'src/app/auth/login-otp-form/login-otp-form.component';

@Component({
  selector: 'to-login-page',
  standalone: true,
  imports: [CommonModule, FloatingButtonComponent, FlipCardComponent, LoginFormComponent, LoginOtpFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginPageComponent {

}
