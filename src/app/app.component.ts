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
import { Component, inject } from "@angular/core";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { IonApp, IonRouterOutlet, Platform } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "app.component.html",
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private platform = inject(Platform);

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

    if (this.platform.is("ios") || this.platform.is("android")) {
      this.ScreenLockOrientation();
    }
  }

  ScreenLockOrientation = async () => {
    await ScreenOrientation.lock({ orientation: "landscape" });
  };
}
