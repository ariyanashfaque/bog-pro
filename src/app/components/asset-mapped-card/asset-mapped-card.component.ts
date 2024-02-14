import { Component, Input, OnInit } from "@angular/core";
import {
  IonCol,
  IonRow,
  IonGrid,
  IonText,
  IonIcon,
  IonLabel,
  IonBadge,
  IonButton,
} from "@ionic/angular/standalone";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonGrid,
    IonBadge,
    IonLabel,
    IonButton,
  ],
  standalone: true,
  selector: "app-asset-mapped-card",
  templateUrl: "./asset-mapped-card.component.html",
  styleUrls: ["./asset-mapped-card.component.scss"],
})
export class AssetMappedCardComponent implements OnInit {
  @Input() asset: AssetsModel;
  constructor() {
    this.asset = {};
  }

  ngOnInit() {
    console.log(this.asset);
  }
}
