import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardContent } from "@angular/material/card";
import { RouterModule } from "@angular/router";

@Component({
  selector: "to-register-card",
  standalone: true,
  imports: [CommonModule,RouterModule, MatButtonModule, MatCardContent],
  templateUrl: "./register-card.component.html",
  styleUrl: "./register-card.component.scss",
})
export class RegisterCardComponent {

}
