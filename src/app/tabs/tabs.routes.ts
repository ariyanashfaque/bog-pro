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
            (page) => page.DashboardPage
          ),
      },
      {
        path: "map-view",
        loadComponent: () =>
          import("../pages/map-view/map-view.page").then(
            (page) => page.MapViewPage
          ),
      },
      {
        path: "assessment",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../pages/assessment/assessment.page").then(
                (page) => page.AssessmentPage
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
              import("../pages/asset-register/asset-register.page").then(
                (page) => page.AssetRegisterPage
              ),
          },
        ],
      },
      {
        path: "action-management",
        loadComponent: () =>
          import("../pages/action-management/action-management.page").then(
            (page) => page.ActionManagementPage
          ),
      },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard",
  },
  {
    path: "asset-register",
    children: [
      {
        path: "asset-mapped/:id",
        loadChildren: () =>
          import(
            "../pages/asset-register/asset-mapped/asset-mapped.routes"
          ).then((routes) => routes.routes),
      },
      {
        path: "asset-map-view/:id",
        loadChildren: () =>
          import(
            "../pages/asset-register/asset-map-view/asset-map-view.routes"
          ).then((routes) => routes.routes),
      },
    ],
  },
  {
    path: "assessment",
    children: [
      {
        path: ":id",
        loadChildren: () =>
          import("../pages/assessment/findings/findings.routes").then(
            (routes) => routes.routes
          ),
      },
    ],
  },
  {
    path: "sap-configuration",
    // loadComponent: () =>
    //   import("../pages/sap-configuration/sap-configuration.page").then(
    //     (m) => m.SapConfigurationPage,
    //   ),

    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/sap-configuration/sap-configuration.routes").then(
            (routes) => routes.routes
          ),
      },
    ],
  },
];
