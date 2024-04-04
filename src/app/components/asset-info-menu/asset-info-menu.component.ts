import {
  Component,
  effect,
  EventEmitter,
  Input,
  model,
  OnInit,
  Output,
} from "@angular/core";
import {
  IonIcon,
  IonText,
  IonGrid,
  IonCol,
  IonLabel,
  IonAvatar,
  IonRow,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-asset-info-menu",
  templateUrl: "./asset-info-menu.component.html",
  styleUrls: ["./asset-info-menu.component.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonTextarea,
    IonInput,
    IonRow,
    IonAvatar,
    IonLabel,
    IonCol,
    IonGrid,
    IonText,
    IonIcon,
  ],
})
export class AssetInfoMenuComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  asset = model<any>({});
  subAssetActiveIndex = model<number>(-1);

  constructor() {
    effect(() => {
      console.log("asset in asset info menu", this.asset());
      console.log("subAssetActiveIndex", this.subAssetActiveIndex());
    });
  }

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }

  nextButton() {
    this.subAssetActiveIndex.update(
      (subAssetActiveIndex) => subAssetActiveIndex + 1
    );
  }
}
