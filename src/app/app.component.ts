import {
  close,
  camera,
  business,
  navigate,
  addCircle,
  mapOutline,
  homeOutline,
  cashOutline,
  trashOutline,
  pencilOutline,
  createOutline,
  searchOutline,
  checkmarkSharp,
  locationOutline,
  clipboardOutline,
  helpCircleOutline,
  listCircleOutline,
  chevronUpOutline,
  chevronDownOutline,
  documentTextOutline,
  personCircleOutline,
  notificationsOutline,
  checkmarkOutline,
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
      camera,
      business,
      navigate,
      addCircle,
      mapOutline,
      homeOutline,
      cashOutline,
      trashOutline,
      pencilOutline,
      createOutline,
      searchOutline,
      checkmarkSharp,
      checkmarkOutline,
      locationOutline,
      clipboardOutline,
      helpCircleOutline,
      listCircleOutline,
      chevronUpOutline,
      chevronDownOutline,
      documentTextOutline,
      personCircleOutline,
      notificationsOutline,
    });
  }
}
