import { Routes } from "@angular/router";
import { FindingsPage } from "./findings.page";

export const routes: Routes = [
  {
    path: "",
    component: FindingsPage,
  },
  // {
  //   path: "asset",
  //   loadComponent: () =>
  //     import("./asset/asset.page").then((page) => page.AssetPage),
  // },
  // {
  //   path: "asset/:assetId",
  //   loadComponent: () =>
  //     import("./asset/asset.page").then((page) => page.AssetPage),
  // },
];
