import {
  star,
  close,
  camera,
  business,
  navigate,
  addCircle,
  mapOutline,
  homeOutline,
  cashOutline,
  trashOutline,
  starOutline,
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
  chevronForwardOutline,
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
      star,
      close,
      camera,
      business,
      navigate,
      addCircle,
      mapOutline,
      homeOutline,
      cashOutline,
      trashOutline,
      starOutline,
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
      chevronForwardOutline,
    });

    if (this.platform.is("ios") || this.platform.is("android")) {
      this.ScreenLockOrientation();
    }
  }

  ScreenLockOrientation = async () => {
    await ScreenOrientation.lock({ orientation: "landscape" });
  };
}
