import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { InfoCardComponent } from "src/app/components/info-card/info-card.component";

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
export class ResetPasswordDialogComponent {}
