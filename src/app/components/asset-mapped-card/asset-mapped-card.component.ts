import {
  IonCol,
  IonRow,
  IonImg,
  IonGrid,
  IonText,
  IonIcon,
  IonCard,
  IonLabel,
  IonBadge,
  IonButton,
  IonButtons,
  IonBackdrop,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/angular/standalone";
import { Router, RouterModule } from "@angular/router";
import {
  Input,
  OnInit,
  Output,
  inject,
  Component,
  EventEmitter,
  output,
} from "@angular/core";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [
    IonImg,
    IonRow,
    IonCol,
    IonCard,
    IonIcon,
    IonText,
    IonGrid,
    IonBadge,
    IonLabel,
    IonButton,
    IonButtons,
    IonBackdrop,
    RouterModule,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
  ],
  standalone: true,
  selector: "app-asset-mapped-card",
  templateUrl: "./asset-mapped-card.component.html",
  styleUrls: ["./asset-mapped-card.component.scss"],
})
export class AssetMappedCardComponent implements OnInit {
  router = inject(Router);
  @Input() plantId: string;
  isApprover: boolean = true;
  isMenuOpen: boolean = false;
  assetID?: string;
  @Output() getAssetId = new EventEmitter<string>();
  @Input() asset: AssetsModel;
  @Input() toggleChecked: boolean;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  constructor() {
    this.asset = {};
    this.plantId = "";
    this.assetID = "";
    this.isMenuOpen = false;
    this.toggleChecked = false;
  }

  ngOnInit() {}
  handleMenuToggle = (assetId?: string) => {
    this.getAssetId.emit(assetId);
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };

  // handleNavigate = (assetId?: string) => {
  //   this.router.navigate([
  //     `/asset-register/asset-mapped/${this.plantId}/asset/${assetId}`,
  //   ]);
  // };
}
