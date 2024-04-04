import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  model,
  effect,
} from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonText,
  IonLabel,
  IonTitle,
  IonSelect,
  IonTextarea,
  IonInput,
  IonSelectOption,
  IonIcon,
  IonButtons,
  IonAvatar,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-sub-asset-modal",
  templateUrl: "./sub-assets-modal.component.html",
  styleUrls: ["./sub-assets-modal.component.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonAvatar,
    IonButtons,
    IonIcon,
    IonInput,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonLabel,
    IonTitle,
    IonSelect,
    IonTextarea,
    IonSelectOption,
  ],
})
export class SubAssetModalComponent implements OnInit {
  isMenuOpen = model(false);
  selectedAsset = model<any>({});

  constructor() {
    effect(() => {
      console.log("selectedAsset in sub asset modal", this.selectedAsset());
    });
  }

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen.update((isMenuOpen) => !isMenuOpen);
  }
}
