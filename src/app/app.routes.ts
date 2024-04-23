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
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/assessment/assessment.page").then(
            (page) => page.AssessmentPage,
          ),
      },
      {
        path: ":id",
        loadChildren: () =>
          import("./pages/assessment/findings/findings.routes").then(
            (routes) => routes.routes,
          ),
      },
    ],
  },
  {
    path: "asset-register",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./pages/asset-register/asset-register.page").then(
            (page) => page.AssetRegisterPage,
          ),
      },
      {
        path: "asset-mapped/:id",
        loadChildren: () =>
          import(
            "./pages/asset-register/asset-mapped/asset-mapped.routes"
          ).then((routes) => routes.routes),
      },
      {
        path: "asset-approval/:id",
        loadChildren: () =>
          import(
            "./pages/asset-register/asset-approval/asset-approval.routes"
          ).then((routes) => routes.routes),
      },
      {
        path: "asset-map-view/:id",
        loadChildren: () =>
          import(
            "./pages/asset-register/asset-map-view/asset-map-view.routes"
          ).then((routes) => routes.routes),
      },
    ],
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
  {
    path: "sap-configuration",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/sap-configuration/sap-configuration.routes").then(
            (routes) => routes.routes,
          ),
      },
    ],
  },
];
