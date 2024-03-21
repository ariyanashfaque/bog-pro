import {
  star,
  link,
  close,
  camera,
  person,
  business,
  navigate,
  caretBack,
  mapOutline,
  lockClosed,
  homeOutline,
  cashOutline,
  starOutline,
  chevronBack,
  codeWorking,
  copyOutline,
  caretForward,
  pencilOutline,
  createOutline,
  searchOutline,
  checkmarkSharp,
  chevronForward,
  locationOutline,
  clipboardOutline,
  helpCircleOutline,
  listCircleOutline,
  syncCircleOutline,
  chevronDownOutline,
  documentTextOutline,
  personCircleOutline,
  notificationsOutline,
  chevronForwardOutline,
  documentAttachOutline,
  chevronDownCircleOutline,
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
      link,
      close,
      camera,
      person,
      business,
      navigate,
      caretBack,
      mapOutline,
      lockClosed,
      homeOutline,
      cashOutline,
      starOutline,
      chevronBack,
      codeWorking,
      copyOutline,
      caretForward,
      pencilOutline,
      createOutline,
      searchOutline,
      checkmarkSharp,
      chevronForward,
      locationOutline,
      clipboardOutline,
      helpCircleOutline,
      listCircleOutline,
      syncCircleOutline,
      chevronDownOutline,
      documentTextOutline,
      personCircleOutline,
      notificationsOutline,
      chevronForwardOutline,
      documentAttachOutline,
      chevronDownCircleOutline,
    });

    if (this.platform.is("ios") || this.platform.is("android")) {
      this.ScreenLockOrientation();
    }
  }

  ScreenLockOrientation = async () => {
    await ScreenOrientation.lock({ orientation: "landscape" });
  };
}
