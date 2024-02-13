import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { PlantsModel } from "src/app/store/models/plant.model";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonCol, IonRow, IonButton, IonGrid, IonIcon],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: PlantsModel;
  isMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.plant = {};
  }
  ngOnInit() {}

  handleMenuToggle = () => {
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };
}
