import {
  business,
  mapOutline,
  homeOutline,
  locationOutline,
  clipboardOutline,
  helpCircleOutline,
  listCircleOutline,
  chevronDownOutline,
  personCircleOutline,
  notificationsOutline,
} from "ionicons/icons";
import { addIcons } from "ionicons";
import { Component } from "@angular/core";
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "app.component.html",
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      business,
      mapOutline,
      homeOutline,
      locationOutline,
      clipboardOutline,
      listCircleOutline,
      chevronDownOutline,
      helpCircleOutline,
      personCircleOutline,
      notificationsOutline,
    });
  }
}
