import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'to-divider-header',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  template: `
    <section class="divider">
    <mat-divider></mat-divider>
    <span> {{ label }} </span>
    <mat-divider></mat-divider>
  </section>
  `,
  styles: [
    `section.divider {
    display: flex;
    justify-content: center;
    align-items: center;

    mat-divider {
      width: 100%;
    }

    span {
      margin:8px;
      flex-shrink: 0;
      text-align: center;
    }
  } `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DividerHeaderComponent {

  @Input({ required: true }) label = "Hallow"

}
