import {
  close,
  navigate,
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

      close,
      business,
      navigate,
      mapOutline,
      homeOutline,
      locationOutline,
      clipboardOutline,
      listCircleOutline,
      helpCircleOutline,
      chevronDownOutline,
      personCircleOutline,
      notificationsOutline,
    });
  }
}
