import {
  OnInit,
  inject,
  effect,
  Component,
  ViewChild,
  EnvironmentInjector,
} from "@angular/core";
import {
  Router,
  RouterModule,
  NavigationStart,
  Event as NavigationEvent,
} from "@angular/router";
import {
  IonMenu,
  IonTabs,
  IonIcon,
  IonList,
  IonItem,
  IonTitle,
  IonLabel,
  IonBadge,
  IonHeader,
  IonTabBar,
  IonButton,
  IonToolbar,
  IonContent,
  IonSplitPane,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/angular/standalone";

@Component({
  imports: [
    IonItem,
    IonList,
    IonIcon,
    IonTabs,
    IonMenu,
    IonBadge,
    IonLabel,
    IonTitle,
    IonButton,
    IonTabBar,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTabButton,
    IonSplitPane,
    RouterModule,
    IonRouterOutlet,
  ],
  standalone: true,
  selector: "app-tabs-menu",
  templateUrl: "./tabs-menu.component.html",
  styleUrls: ["./tabs-menu.component.scss"],
})
export class TabsMenuComponent implements OnInit {
  private router = inject(Router);
  selectedTab: string;
  showTabsMenu: boolean;

  constructor() {
    this.showTabsMenu = true;
    this.selectedTab = "dashboard";
  }

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        switch (true) {
          case event.url === "/dashboard":
            this.showTabsMenu = true;
            this.selectedTab = "dashboard";
            break;
          case event.url === "/map-view":
            this.showTabsMenu = true;
            this.selectedTab = "map-view";
            break;
          case event.url === "/assessment":
            this.showTabsMenu = true;
            this.selectedTab = "assessment";
            break;
          case event.url === "/asset-register":
            this.showTabsMenu = true;
            this.selectedTab = "asset-register";
            break;
          case event.url === "/action-management":
            this.showTabsMenu = true;
            this.selectedTab = "action-management";
            break;

          default:
            this.showTabsMenu = false;
            this.selectedTab = "dashboard";
            break;
        }

        console.log(event.url);
        console.log(this.showTabsMenu);
      }
    });
  }

  setCurrentTab = (tab: string) => {
    this.selectedTab = tab;
  };
}
