import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  inject
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "to-otp-form-template",
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./otp-form-template.component.html",
  styleUrls: ["./otp-form-template.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpFormTemplateComponent {
  private readonly injector = inject(Injector);


}
