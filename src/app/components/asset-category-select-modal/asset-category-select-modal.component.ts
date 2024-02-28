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
  IonSelect,
  IonToolbar,
  IonTextarea,
  IonSelectOption,
} from "@ionic/angular/standalone";
import { AssetCategoryModel } from "src/app/store/models/plant.model";
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
    IonSelect,
    IonToolbar,
    IonTextarea,
    IonSelectOption,
  ],
  standalone: true,
  selector: "app-asset-category-select-modal",
  templateUrl: "./asset-category-select-modal.component.html",
  styleUrls: ["./asset-category-select-modal.component.scss"],
})
export class AssetCategorySelectModalComponent implements OnInit {
  selectedButton: string = "";
  assetCategory: AssetCategoryModel;
  @Input() isMenuOpen: boolean = false;
  @Output() CategoryChanged = new EventEmitter<any>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  category: any[];

  constructor() {
    this.category = [];
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

  ngOnInit() {
    // console.log(this.category);

    console.log(this.assetCategory);
  }

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }

  handleCategory = (categoryType: string) => {
    this.assetCategory[categoryType as keyof AssetCategoryModel] = true;
    this.category.push(
      this.assetCategory[categoryType as keyof AssetCategoryModel],
    );
    this.selectedButton = categoryType;
  };

  categorySubmit = () => {
    this.CategoryChanged.emit(this.assetCategory);
  };
}
