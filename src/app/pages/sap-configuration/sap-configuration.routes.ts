import { Routes } from "@angular/router";
import { SapConfigurationPage } from "./sap-configuration.page";

export const routes: Routes = [
  {
    path: "",
    component: SapConfigurationPage,
  },
  {
    path: "configuration",
    loadComponent: () =>
      import("../update-sap-configuration/update-sap-configuration.page").then(
        (page) => page.AddSapConfigurationPage,
      ),
  },
  {
    path: "configuration/:id",
    loadComponent: () =>
      import("../update-sap-configuration/update-sap-configuration.page").then(
        (page) => page.AddSapConfigurationPage,
      ),
  },
];
