import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/dashboard/dashboard.page").then(
        (page) => page.DashboardPage,
      ),
  },
  {
    path: "assessment",
    loadComponent: () =>
      import("./pages/assessment/assessment.page").then(
        (page) => page.AssessmentPage,
      ),
  },
  {
    path: "asset-register",
    loadComponent: () =>
      import("./pages/asset-register/asset-register.page").then(
        (page) => page.AssetRegisterPage,
      ),
  },
  {
    path: "action-management",
    loadComponent: () =>
      import("./pages/action-management/action-management.page").then(
        (page) => page.ActionManagementPage,
      ),
  },
  {
    path: "map-view",
    loadComponent: () =>
      import("./pages/map-view/map-view.page").then((page) => page.MapViewPage),
  },
];
