import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.routes").then((route) => route.routes),
  },  {
    path: 'bulk-upload',
    loadComponent: () => import('./pages/asset-register/bulk-upload/bulk-upload.page').then( m => m.BulkUploadPage)
  },

];
