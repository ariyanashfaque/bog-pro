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
  IonTextarea,
  IonSelect,
} from "@ionic/angular/standalone";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AssetCategoryModel } from "src/app/store/models/plant.model";

@Component({
  imports: [
    IonTextarea,
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
    IonSelect,
  ],
  standalone: true,
  selector: "app-asset-category-select-modal",
  templateUrl: "./asset-category-select-modal.component.html",
  styleUrls: ["./asset-category-select-modal.component.scss"],
})
export class AssetCategorySelectModalComponent implements OnInit {
  assetCategory: AssetCategoryModel;
  @Input() isMenuOpen: boolean = false;
  @Output() CategoryChanged = new EventEmitter<any>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.assetCategory = {
      sim: false,
      quarry: false,
      insurance: false,
      electrical: false,
      environment: false,
      hotMaterial: false,
      fireProtection: false,
      materialManagement: false,
    };
  }

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }

  handleCategory = (categoryType: string) => {
    this.assetCategory[categoryType as keyof AssetCategoryModel] = true;
  };

  categorySubmit = () => {
    this.CategoryChanged.emit(this.assetCategory);
  };
}
