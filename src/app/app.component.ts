import {
  star,
  link,
  close,
  camera,
  person,
  business,
  navigate,
  addCircle,
  caretBack,
  mapOutline,
  eyeOutline,
  lockClosed,
  homeOutline,
  cashOutline,
  starOutline,
  saveOutline,
  chevronBack,
  codeWorking,
  copyOutline,
  exitOutline,
  trashOutline,
  caretForward,
  closeOutline,
  brushOutline,
  expandOutline,
  pencilOutline,
  createOutline,
  searchOutline,
  checkmarkSharp,
  chevronForward,
  locationOutline,
  trashBinOutline,
  clipboardOutline,
  chevronUpOutline,
  checkmarkOutline,
  helpCircleOutline,
  listCircleOutline,
  syncCircleOutline,
  chevronDownOutline,
  alertCircleOutline,
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
import { TabsMenuComponent } from "./components/tabs-menu-component/tabs-menu.component";
import { expand } from "rxjs";

@Component({
  standalone: true,
  selector: "app-root",
  templateUrl: "app.component.html",
  imports: [IonApp, IonRouterOutlet, TabsMenuComponent],
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
      addCircle,
      caretBack,
      eyeOutline,
      mapOutline,
      lockClosed,
      homeOutline,
      cashOutline,
      starOutline,
      saveOutline,
      exitOutline,
      chevronBack,
      codeWorking,
      copyOutline,
      trashOutline,
      closeOutline,
      brushOutline,
      expandOutline,
      caretForward,
      pencilOutline,
      createOutline,
      searchOutline,
      checkmarkSharp,
      chevronForward,
      locationOutline,
      trashBinOutline,
      checkmarkOutline,
      clipboardOutline,
      chevronUpOutline,
      helpCircleOutline,
      listCircleOutline,
      syncCircleOutline,
      chevronDownOutline,
      alertCircleOutline,
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
