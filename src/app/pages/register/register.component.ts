import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from 'src/app/auth/register-form/register-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@Component({
  selector: 'to-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, FloatingButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  protected onButtonClick() {
    
  }

}
