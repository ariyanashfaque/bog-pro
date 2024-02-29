import {
  close,
  camera,
  business,
  navigate,
  mapOutline,
  homeOutline,
  cashOutline,
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
} from "ionicons/icons";
import { addIcons } from "ionicons";
import { Component } from "@angular/core";
import { ScreenOrientation } from "@capacitor/screen-orientation";
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
      mapOutline,
      homeOutline,
      cashOutline,
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
    });

    this.ScreenLockOrientation();
  }

  ScreenLockOrientation = async () => {
    await ScreenOrientation.lock({ orientation: "landscape" });
  };
}
