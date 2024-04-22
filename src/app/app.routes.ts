import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.routes").then((route) => route.routes),
  },
  {
    path: "findings",
    loadComponent: () =>
      import("./pages/assessment/findings/findings.page").then(
        (m) => m.FindingsPage,
      ),
  },
  {
    path: "asset-map-view",
    loadComponent: () =>
      import("./pages/asset-register/asset-map-view/asset-map-view.page").then(
        (m) => m.AssetMapViewPage,
      ),
  },
  {
    path: "asset-approval",
    loadComponent: () =>
      import("./pages/asset-register/asset-approval/asset-approval.page").then(
        (m) => m.AssetApprovalPage,
      ),
  },
];
