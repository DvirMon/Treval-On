import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login/login.component";
import { placesResolver } from "./pages/places/places.resolver";
import { verifyGuard } from "./pages/verify/verify.guard";
import { placesGuard } from "./pages/places/places.guard";

export const appRoutes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: 'verify-email',
    loadComponent: () => import("./pages/verify/verify.component").then(m => m.VerifyPageComponent),
    canActivate: [verifyGuard]
  },
  {
    path: 'register',
    loadComponent: () => import("./pages/register/register.component").then(m => m.RegisterPageComponent)
  },
  {
    path: 'places/:userId',
    loadComponent: () => import("./pages/places/places.component").then(m => m.PlacesComponent),
    canActivate: [placesGuard],
    resolve: { routeResolver: placesResolver }
  },
  {
    path: "**",
    loadComponent: () => import("./pages/pnf/pnf.component").then(m => m.PnfComponent)
  },
  {
    path: "",
    pathMatch: 'full',
    redirectTo: '/'
  }
];
