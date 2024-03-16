import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

export type Side = "left" | "right" | { error: string };

@Component({
  selector: "to-floating-button",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <button
      mat-raised-button
      [disableRipple]="true"
      color="accent"
      [style.right.px]="side() === 'left' ? null : 0"
      [style.left.px]="side() === 'right' ? null : 0"
      [style.border-top-right-radius.px]="side() === 'left' ? 25 : null"
      [style.border-bottom-right-radius.px]="side() === 'left' ? 25 : null"
      [style.border-top-left-radius.px]="side() === 'right' ? 25 : null"
      [style.border-bottom-left-radius.px]="side() === 'right' ? 25 : null"
      [routerLink]="routerLink()"
      (click)="clicked.emit()">
      {{ label() | titlecase }}
    </button>
  `,
  styles: [
    `
      button {
        position: fixed;
        top: 64px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingButtonComponent {
  side = input<Side>("right");
  label = input<string>();
  routerLink = input<string>();

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
