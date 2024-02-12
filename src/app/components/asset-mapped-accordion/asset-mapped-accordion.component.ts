import {
  IonImg,
  IonItem,
  IonLabel,
  IonAccordion,
  IonCardContent,
  IonAccordionGroup,
} from "@ionic/angular/standalone";
import { Component, Input, OnInit } from "@angular/core";
import { AssetMappedCardComponent } from "../asset-mapped-card/asset-mapped-card.component";
import { AssetsModel } from "src/app/store/models/plant.model";

@Component({
  imports: [
    IonImg,
    IonItem,
    IonLabel,
    IonAccordion,
    IonCardContent,
    IonAccordionGroup,
    AssetMappedCardComponent,
  ],
  standalone: true,
  selector: "app-asset-mapped-accordion",
  templateUrl: "./asset-mapped-accordion.component.html",
  styleUrls: ["./asset-mapped-accordion.component.scss"],
})
export class AssetMappedAccordionComponent implements OnInit {
  @Input() asset: AssetsModel;

  constructor() {
    this.asset = {};
  }
  ngOnInit() {
    console.log(this.asset);
  }
}
