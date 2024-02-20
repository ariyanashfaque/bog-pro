import {
  inject,
  Component,
  ViewChild,
  EnvironmentInjector,
} from "@angular/core";
import {
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  @ViewChild("tabs", { static: false }) tabs: IonTabs;
  selectedTab: string;

  constructor() {
    this.selectedTab = "";
  }

  setCurrentTab = () => {
    this.selectedTab = this.tabs.getSelected()!;
  };
}
