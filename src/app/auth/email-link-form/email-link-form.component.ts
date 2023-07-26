import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Output, inject, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { SignInEvent, SignInMethod } from '../store/auth.model';
import { MatIconModule } from '@angular/material/icon';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';
import { InfoCardComponent } from 'src/app/components/info-card/info-card.component';



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
    MatButtonModule,
    MatIconModule,
    InfoCardComponent
  ],
  templateUrl: './email-link-form.component.html',
  styleUrls: ['./email-link-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EmailLinkFormComponent {

  private readonly injector = inject(Injector);
  protected readonly formControl: FormControl<string>;

  @Output() emailLinkSignIn: EventEmitter<SignInEvent> = new EventEmitter();

  constructor() {
    this.formControl = this._getEmailControl()
  }

  private _getEmailControl(): FormControl<string> {
    return inject(NonNullableFormBuilder).control('dmenajem@gmail.com', [Validators.required, Validators.email])
  }

  protected onSubmit(value: string): void {
    const event: SignInEvent = { method: SignInMethod.EMAIL_LINK, data: value }
    this.emailLinkSignIn.emit(event)
  }

  protected onEmailAndPasswordSighIn(): void {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip()
    })
  }

}
