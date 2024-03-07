import {
  IonCol,
  IonRow,
  IonGrid,
  IonText,
  IonIcon,
  IonCard,
  IonLabel,
  IonBadge,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/angular/standalone";
import { Router, RouterModule } from "@angular/router";
import { Component, Input, OnInit, inject } from "@angular/core";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [
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
  @Input() toggleChecked: boolean;
  @Input() asset: AssetsModel;

  constructor() {
    this.asset = {};
    this.plantId = "";
    this.toggleChecked = false;
  }

  ngOnInit() {}

  handleNavigate = (assetId?: string) => {
    this.router.navigate([
      `/asset-register/asset-mapped/${this.plantId}/asset/${assetId}`,
    ]);
  };
}
