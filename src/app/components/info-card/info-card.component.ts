import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'to-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule ],
  template: `
    <section class="info-card-wrapper">
      <mat-icon color="primary">{{ icon }}</mat-icon>
      <span>{{ text }}</span>
    </section>
  `,
  // styles: [
  // ]
    styleUrls: ['./info-card.component.scss']
})


export class InfoCardComponent {
  @Input() text!: string;
  @Input() icon: string = 'attach_email'; // Default icon value if not provided
}
