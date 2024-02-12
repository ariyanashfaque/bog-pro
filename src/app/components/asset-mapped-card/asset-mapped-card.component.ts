import { Component, OnInit } from "@angular/core";
import { IonCol, IonGrid, IonRow } from "@ionic/angular/standalone";

@Component({
  imports: [IonRow, IonGrid, IonCol],
  standalone: true,
  selector: "app-asset-mapped-card",
  templateUrl: "./asset-mapped-card.component.html",
  styleUrls: ["./asset-mapped-card.component.scss"],
})
export class AssetMappedCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
