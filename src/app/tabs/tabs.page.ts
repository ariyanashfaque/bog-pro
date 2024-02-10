import {
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from "@ionic/angular/standalone";
import { Component, EnvironmentInjector, inject } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
}
