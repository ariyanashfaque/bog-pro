import { Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

export const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/dashboard",
      },
      {
        path: "dashboard",
        loadComponent: () =>
          import("../pages/dashboard/dashboard.page").then(
            (page) => page.DashboardPage,
          ),
      },
      {
        path: "map-view",
        loadComponent: () =>
          import("../pages/map-view/map-view.page").then(
            (page) => page.MapViewPage,
          ),
      },
    ],
  },
  {
    path: "asset-register",
    loadChildren: () =>
      import("../pages/asset-register/asset-register.routes").then(
        (route) => route.routes,
      ),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard",
  },
];
