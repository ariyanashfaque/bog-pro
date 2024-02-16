import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonButton,
  IonText, IonBadge } from "@ionic/angular/standalone";
import { RouterModule } from "@angular/router";
import { PlantsModel } from "src/app/store/models/plant.model";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonBadge, IonText, IonCol, IonRow, IonButton, IonGrid, IonIcon, RouterModule],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: PlantsModel;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  isMenuOpen: boolean = false;

  constructor() {
    this.plant = {};
  }
  ngOnInit() {}

  handleMenuToggle = () => {
    if (this.plant?.totalRejectedAssets) {
      this.isMenuToggleOpen.emit(!this.isMenuOpen);
    }
  };
}
