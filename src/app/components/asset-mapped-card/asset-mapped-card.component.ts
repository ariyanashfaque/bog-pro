import {
  Input,
  input,
  model,
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
import { Router, RouterModule } from "@angular/router";
import { AssetModel } from "src/app/store/models/asset.model";

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

  assetStatus: any;
  isDraft: boolean = false;
  role: string = "engineer";
  // role: string = "country_hse_head";

  isApprover: boolean = true;
  isMenuOpen: boolean = false;
  @Input() toggleChecked: boolean;
  plantId = input.required<string>();
  asset = input.required<AssetModel>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.isMenuOpen = false;
    this.toggleChecked = false;
  }

  ngOnInit() {}

  handleMenuToggle = () => {
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };

  handleNavigate = (assetId?: string) => {
    this.router.navigate([
      `/asset-register/asset-mapped/${this.plantId()}/asset/${assetId}`,
    ]);
  };
}
