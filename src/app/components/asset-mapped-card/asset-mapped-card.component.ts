import {
  Input,
  input,
  OnInit,
  Output,
  inject,
  Component,
  EventEmitter,
} from "@angular/core";
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
import { AssetModel, AssetDraftStatus } from "src/app/store/models/asset.model";
import { Router, RouterModule } from "@angular/router";

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
  isApprover: boolean = true;
  isMenuOpen: boolean = false;
  @Input() toggleChecked: boolean;
  plantId = input.required<string>();
  asset = input.required<AssetModel>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  assetID?: string;
  @Output() getAssetId = new EventEmitter<string>();
  constructor() {
    this.isMenuOpen = false;
    this.toggleChecked = false;
    this.assetID = "";
  }
  ngOnInit() {
    // console.log(this.asset());
  }

  // handleMenuToggle = () => {
  //   this.isMenuToggleOpen.emit(!this.isMenuOpen);
  // };

  handleMenuToggle = (assetId?: string) => {
    this.getAssetId.emit(assetId);
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };

  // handleNavigate = (assetId?: string) => {
  //   this.router.navigate([
  //     `/asset-register/asset-mapped/${this.plantId()}/asset/${assetId}`,
  //   ]);
  // };
}
