import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { InfoCardComponent } from 'src/app/components/info-card/info-card.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'to-email-link-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, MatDividerModule, InfoCardComponent],
  templateUrl: './email-link-dialog.component.html',
  styleUrls: ['./email-link-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class EmailLinkDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {email : string},
  ) { }
}
