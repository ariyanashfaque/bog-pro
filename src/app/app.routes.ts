import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.routes").then((route) => route.routes),
  },  {
    path: 'findings',
    loadComponent: () => import('./pages/assessment/findings/findings.page').then( m => m.FindingsPage)
  },

];
