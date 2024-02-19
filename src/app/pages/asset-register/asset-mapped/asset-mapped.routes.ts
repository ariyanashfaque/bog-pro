import { Routes } from "@angular/router";
import { AssetMappedPage } from "./asset-mapped.page";

export const routes: Routes = [
  {
    path: "",
    component: AssetMappedPage,
  },
  {
    path: "asset",
    loadComponent: () =>
      import("./asset/asset.page").then((page) => page.AssetPage),
  },
];
