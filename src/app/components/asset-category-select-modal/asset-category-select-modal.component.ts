import {
  Input,
  OnInit,
  Output,
  inject,
  Component,
  EventEmitter,
} from "@angular/core";
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
  IonButtons,
  IonTextarea,
  IonSelectOption,
} from "@ionic/angular/standalone";
import {
  CategoriesModel,
  AssetCategoryModel,
} from "src/app/store/models/plant.model";
import { Store } from "@ngrx/store";

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
    IonButtons,
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
  store = inject(Store);
  @Input() isMenuOpen: boolean = false;
  @Input() selectedCategories: CategoriesModel[];
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  @Output() selectedCategoriesEmit = new EventEmitter<CategoriesModel[]>();

  categories: CategoriesModel[];
  selectedCategoryCount: number;
  assetCategory: AssetCategoryModel;

  constructor() {
    this.categories = [];
    this.selectedCategories = [];
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
    this.selectedCategoryCount = 0;
  }

  ngOnInit() {
    this.store.select("categories").subscribe({
      next: (categories: CategoriesModel[]) => {
        this.categories = categories
          .map((category) => {
            if (
              this.selectedCategories &&
              this.selectedCategories.find(
                (selectedCategory) =>
                  selectedCategory.id === category.id &&
                  selectedCategory.categorySelected,
              )
            ) {
              return {
                ...category,
                categorySelected: true,
              };
            } else {
              return {
                ...category,
                categorySelected: false,
              };
            }
          })
          .sort((a, b) => {
            if (a?.order > b.order) return 1;
            if (a.order < b.order) return -1;
            return 0;
          });

        console.log(this.categories);
      },
    });
  }

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }

  handleCategory = (category: CategoriesModel) => {
    category.categorySelected = !category.categorySelected;
    this.selectedCategoryCount = this.categories?.filter(
      (category) => category.categorySelected,
    ).length;
  };

  handleCategorySelect = () => {
    this.selectedCategoriesEmit.emit(this.categories);
  };
}
