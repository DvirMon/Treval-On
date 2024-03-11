import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login/login.component";
// import { placesResolver } from "./pages/places/places.resolver";
import { verifyGuard } from "./pages/verify/verify.guard";
import { placesResolver } from "./pages/places/places.resolver";
import { cleanupGuard } from "./auth/cleanup.guard";

export const appRoutes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
    canDeactivate: [cleanupGuard],
  },
  {
    path: "verify-email",
    loadComponent: () =>
      import("./pages/verify/verify.component").then(
        (m) => m.VerifyPageComponent
      ),
    canActivate: [verifyGuard],
  },
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register.component").then(
        (m) => m.RegisterPageComponent
      ),
    canDeactivate: [cleanupGuard],
  },
  {
    path: "reset",
    loadComponent: () =>
      import("./pages/reset/reset.component").then((m) => m.ResetPageComponent),
    canDeactivate: [cleanupGuard],
  },
  {
    path: "places/:userId",
    loadComponent: () =>
      import("./pages/places/places.component").then((m) => m.PlacesComponent),
    // canActivate: [placesGuard],
    resolve: { placesResolver },
  },
  // {
  //   path: "**",
  //   loadComponent: () => import("./pages/pnf/pnf.component").then(m => m.PnfComponent)
  // },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/",
  },
];
