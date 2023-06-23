import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from 'src/app/auth/register-form/register-form.component';

@Component({
  selector: 'to-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

}
