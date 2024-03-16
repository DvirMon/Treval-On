import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { InfoCardComponent } from "src/app/shared/components/info-card/info-card.component";

@Component({
  selector: "to-email-link-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    InfoCardComponent,
  ],
  templateUrl: "./email-link-dialog.component.html",
  styleUrls: ["./email-link-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLinkDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string }) {}
}
