import {
  IonCol,
  IonRow,
  IonGrid,
  IonIcon,
  IonText,
  IonBadge,
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
  imports: [
    IonCol,
    IonRow,
    IonText,
    IonGrid,
    IonIcon,
    IonBadge,
    IonButton,
    RouterModule,
  ],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: PlantsModel;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  isMenuOpen: boolean = false;
  totalAssetMapped: number = 5;
  isApprover: boolean = false;
  isError:boolean=true;

  constructor() {
    this.plant = {};
  }
  ngOnInit() {}

  handleMenuToggle = () => {
    console.log(this.isMenuOpen);
    
    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };
}
