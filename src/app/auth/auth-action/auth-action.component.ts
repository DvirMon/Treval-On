import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
  selector: "to-auth-action",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCard,
    MatCardContent,
  ],
  templateUrl: "./auth-action.component.html",
  styleUrl: "./auth-action.component.scss",
})
export class AuthActionComponent {
  label = input<string>();
  boldLabel = input<string>();
  routerLink = input<string>();

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
