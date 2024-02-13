import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";
import { RouterModule } from "@angular/router";
import { PlantsModel } from "src/app/store/models/plant.model";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonCol, IonRow, IonButton, IonGrid, IonIcon, RouterModule],
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
