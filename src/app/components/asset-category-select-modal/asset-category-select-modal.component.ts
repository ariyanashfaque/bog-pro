import {
  IonImg,
  IonCol,
  IonRow,
  IonIcon,
  IonText,
  IonGrid,
  IonTitle,
  IonButton,
  IonFooter,
  IonToolbar,
  IonSelectOption,
} from "@ionic/angular/standalone";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  imports: [
    IonRow,
    IonCol,
    IonImg,
    IonGrid,
    IonText,
    IonIcon,
    IonTitle,
    IonFooter,
    IonButton,
    IonToolbar,
    IonSelectOption,
  ],
  standalone: true,
  selector: "app-asset-category-select-modal",
  templateUrl: "./asset-category-select-modal.component.html",
  styleUrls: ["./asset-category-select-modal.component.scss"],
})
export class AssetCategorySelectModalComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
