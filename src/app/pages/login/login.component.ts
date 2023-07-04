import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';

@Component({
  selector: 'to-login-page',
  standalone: true,
  imports: [CommonModule, FlipCardComponent, LoginFormComponent, FloatingButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginPageComponent {


  protected isFlipped: WritableSignal<boolean> = signal(false);

}
