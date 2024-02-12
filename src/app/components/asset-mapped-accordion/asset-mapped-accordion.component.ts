import {
  IonImg,
  IonItem,
  IonLabel,
  IonAccordion,
  IonCardContent,
  IonAccordionGroup,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";

@Component({
  imports: [
    IonImg,
    IonItem,
    IonLabel,
    IonAccordion,
    IonCardContent,
    IonAccordionGroup,
  ],
  standalone: true,
  selector: "app-asset-mapped-accordion",
  templateUrl: "./asset-mapped-accordion.component.html",
  styleUrls: ["./asset-mapped-accordion.component.scss"],
})
export class AssetMappedAccordionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
