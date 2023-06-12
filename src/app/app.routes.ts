import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'register',
    loadComponent: () => import("./pages/register/register.component").then(m => m.RegisterComponent)
  },
  {
    path: 'places',
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
