import { Component, Input, OnInit } from "@angular/core";
import { PlantsModel } from "src/app/store/models/plant.model";
import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonCol, IonRow, IonButton, IonGrid, IonIcon],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: PlantsModel;

  constructor() {
    this.plant = {};
  }
  ngOnInit() {
    console.log(this.plant);
  }
  handleMenuToggle = () => {};
}
