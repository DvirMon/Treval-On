import {
  Component,
  Injector,
  inject,
  runInInjectionContext,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { InfoCardComponent } from "src/app/shared/components/info-card/info-card.component";

@Component({
  selector: "to-reset-password-dialog",
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    InfoCardComponent,
  ],
  templateUrl: "./reset-password-dialog.component.html",
  styleUrl: "./reset-password-dialog.component.scss",
})
export class ResetPasswordDialogComponent {
  private injector: Injector = inject(Injector);

  public onLogIn() {
    runInInjectionContext(this.injector, () => {
      inject(Router).navigateByUrl("/");
    });
  }
}
