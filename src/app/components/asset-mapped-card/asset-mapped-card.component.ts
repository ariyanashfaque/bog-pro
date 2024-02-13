import { Component, Input, OnInit } from "@angular/core";
import { IonCol, IonGrid, IonRow } from "@ionic/angular/standalone";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [IonRow, IonGrid, IonCol],
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

  ngOnInit() {}
}
