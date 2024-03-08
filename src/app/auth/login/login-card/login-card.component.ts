import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";

@Component({
  selector: "to-login-card",
  standalone: true,
  imports: [
    RouterModule,
    NgOptimizedImage,
    MatCardModule,
    DividerHeaderComponent,
  ],
  templateUrl: "./login-card.component.html",
  styleUrl: "./login-card.component.scss",
})
export class LoginCardComponent {}
