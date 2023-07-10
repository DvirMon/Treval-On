import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';

@Component({
  selector: 'to-otp-form-template',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './otp-form-template.component.html',
  styleUrls: ['./otp-form-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OtpFormTemplateComponent {

  private readonly injector = inject(Injector);


  protected onEmailAndPasswordSighIn(): void {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip()
    })
  }

}
