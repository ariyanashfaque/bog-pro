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
import { SiteModel } from "src/app/store/models/asset.model";
import { AccessModel } from "src/app/store/models/role.model";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
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
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: SiteModel;
  @Input() role: AccessModel;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  isError: boolean = true;
  isMenuOpen: boolean = false;
  isApprover: boolean = false;
  totalAssetMapped: number = 5;

  constructor() {
    this.plant = {};
  }
  ngOnInit() {
    console.log(this.plant);
    // console.log(this.role);
  }

  handleMenuToggle = () => {
    console.log(this.isMenuOpen);

    this.isMenuToggleOpen.emit(!this.isMenuOpen);
  };
}
