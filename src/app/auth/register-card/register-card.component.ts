import { Component, Injector, inject, runInInjectionContext } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardContent } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "to-register-card",
  standalone: true,
  imports: [CommonModule,RouterModule, MatButtonModule, MatCardContent],
  templateUrl: "./register-card.component.html",
  styleUrl: "./register-card.component.scss",
})
export class RegisterCardComponent {

}
