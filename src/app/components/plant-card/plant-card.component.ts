import {
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonButton, IonGrid, IonRow, IonIcon, IonCol],
})
export class PlantCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  handleMenuToggle = () => {};
}
