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
        (m) => m.FindingsPage
      ),
  },
  {
    path: "asset-map-view",
    loadComponent: () =>
      import("./pages/asset-register/asset-map-view/asset-map-view.page").then(
        (m) => m.AssetMapViewPage
      ),
  },
  {
    path: "bulk-upload",
    loadComponent: () =>
      import("./pages/asset-register/bulk-upload/bulk-upload.page").then(
        (m) => m.BulkUploadPage
      ),
  },
];
