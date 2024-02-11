import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.routes").then((route) => route.routes),
  },
];
