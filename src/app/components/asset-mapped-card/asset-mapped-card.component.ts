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
  input,
  model,
} from "@angular/core";
import {
  AssetMappedStatusModel,
  AssetModel,
  AssetStatusModel,
  DraftApproverAssetStatus,
  DraftEngineerAssetStatus,
  RegisteredApproverAssetStatus,
  RegisteredEngineerAssetStatus,
} from "src/app/store/models/asset.model";

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

  isDraft: boolean = false;
  role: string = "engineer";
  assetStatus: AssetMappedStatusModel;
  // role: string = "country_hse_head";

  isApprover: boolean = true;
  isMenuOpen: boolean = false;
  @Input() toggleChecked: boolean;
  plantId = input.required<string>();
  asset = model.required<AssetModel>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.isMenuOpen = false;
    this.toggleChecked = false;
  }

  ngOnInit() {
    this.asset().assetStatus?.forEach((status: AssetStatusModel) => {
      if (this.isDraft && status.isDraft && this.role === status.role) {
        this.assetStatus = status.status as DraftEngineerAssetStatus;
      }
      if (!this.isDraft && status.isRegistered && this.role === status.role) {
        this.assetStatus = status.status as RegisteredEngineerAssetStatus;
      }
      // if (this.isDraft === status.isDraft && this.role === status.role) {
      //   this.assetStatus = status.status as DraftApproverAssetStatus;
      // }
      // if (!this.isDraft === status.isRegistered && this.role === status.role) {
      //   this.assetStatus = status.status as RegisteredApproverAssetStatus;
      // }
    });
    console.log(this.assetStatus);
    console.log(this.asset().assetStatus);
  }

  handleMenuToggle = () => {
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };

  handleNavigate = (assetId?: string) => {
    this.router.navigate([
      `/asset-register/asset-mapped/${this.plantId()}/asset/${assetId}`,
    ]);
  };
}
