import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";
<<<<<<< HEAD
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
=======
import { RouterModule } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
>>>>>>> 53a1be7169f618218a01999e104227ea13d56dd3
import { PlantsModel } from "src/app/store/models/plant.model";

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
