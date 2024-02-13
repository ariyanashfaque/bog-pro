import { Component, Input, OnInit } from "@angular/core";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
  IonBadge,
  IonText,
} from "@ionic/angular/standalone";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [IonText, IonBadge, IonLabel, IonRow, IonGrid, IonCol],
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
