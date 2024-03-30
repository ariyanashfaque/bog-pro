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
} from "@angular/core";
import { AssetsModel } from "src/app/store/models/plant.model";
import { AssetUpdateModalComponent } from "./asset-update-modal/asset-update-modal.component";

@Component({
  standalone: true,
  selector: "app-approval-asset-mapped-card",
  templateUrl: "./approval-asset-mapped-card.component.html",
  styleUrls: ["./approval-asset-mapped-card.component.scss"],
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
    AssetUpdateModalComponent,
  ],
})
export class ApprovalAssetMappedCardComponent implements OnInit {
  router = inject(Router);
  @Input() plantId: string;
  isMenuOpen: boolean = false;
  @Input() asset: AssetsModel;
  @Input() toggleChecked: boolean;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.asset = {};
    this.plantId = "";
    this.isMenuOpen = false;
    this.toggleChecked = false;
  }

  ngOnInit() {}
  handleMenuToggle = () => {
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };

  handleNavigate = (assetId?: string) => {
    this.router.navigate([
      `/asset-register/asset-mapped/${this.plantId}/asset/${assetId}`,
    ]);
  };
}
