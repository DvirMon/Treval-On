import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { ResetFormComponent } from "src/app/auth/reset/reset-form/reset-form.component";

@Component({
  selector: "to-reset",
  standalone: true,
  imports: [ResetFormComponent, AuthActionComponent],
  templateUrl: "./reset.component.html",
  styleUrl: "./reset.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPageComponent {}
