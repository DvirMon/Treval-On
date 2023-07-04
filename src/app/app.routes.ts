import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginPageComponent } from "./pages/login/login.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: 'register',
    loadComponent: () => import("./pages/register/register.component").then(m => m.RegisterPageComponent)
  },
  {
    path: 'places/:userId',
    loadComponent: () => import("./pages/home/home.component").then(m => m.HomeComponent)
  },
  {
    path : "**",
    loadComponent: () => import("./pages/pnf/pnf.component").then(m => m.PnfComponent)
  },
  {
    path : "",
    pathMatch : 'full',
    redirectTo : '/'
  }
];
