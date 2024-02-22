import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IonIcon,
  IonImg,
  IonCol,
  IonText,
  IonRow,
  IonGrid,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/angular/standalone";

@Component({
  imports: [
    IonButton,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
    IonImg,
    IonIcon,
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
