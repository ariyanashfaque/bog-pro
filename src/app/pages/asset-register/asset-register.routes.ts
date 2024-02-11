import { Routes } from "@angular/router";
import { AssetRegisterPage } from "./asset-register.page";

export const routes: Routes = [
  {
    path: "",
    component: AssetRegisterPage,
  },
  {
    path: "asset-mapped",
    loadComponent: () =>
      import("./asset-mapped/asset-mapped.page").then(
        (page) => page.AssetMappedPage,
      ),
  },
];
