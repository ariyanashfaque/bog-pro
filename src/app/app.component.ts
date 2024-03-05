import {
  star,
  close,
  camera,
  business,
  navigate,
  mapOutline,
  homeOutline,
  cashOutline,
  starOutline,
  pencilOutline,
  createOutline,
  checkmarkSharp,
  locationOutline,
  clipboardOutline,
  helpCircleOutline,
  listCircleOutline,
  chevronDownOutline,
  documentTextOutline,
  personCircleOutline,
  notificationsOutline,
  chevronForwardOutline,
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
      star,
      close,
      camera,
      business,
      navigate,
      mapOutline,
      homeOutline,
      cashOutline,
      starOutline,
      pencilOutline,
      createOutline,
      checkmarkSharp,
      locationOutline,
      clipboardOutline,
      helpCircleOutline,
      listCircleOutline,
      chevronDownOutline,
      documentTextOutline,
      personCircleOutline,
      notificationsOutline,
      chevronForwardOutline,
    });
  }
}
