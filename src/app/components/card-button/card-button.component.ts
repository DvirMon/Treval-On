import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
  selector: "to-card-button",
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCard, MatCardContent],
  
  template: `<mat-card>
    <mat-card-content>
      <section>
        <button
          mat-raised-button
          [disableRipple]="true"
          color="accent"
          [routerLink]="routerLink()">
          {{ label() }} <b>{{ boldLabel() }}</b>
        </button>
      </section>
    </mat-card-content>
  </mat-card> `,

  styles: `mat-card {
    height: 100%;
    justify-content: center;
  
    mat-card-content {
      padding: 32px;
  
      button {
        width: 100%;
      }
    }
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardButtonComponent {
  label = input<string>();
  boldLabel = input<string>();
  routerLink = input<string>();

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
