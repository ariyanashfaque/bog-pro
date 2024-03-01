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
import {
  AssetCategoryModel,
  CategoriesModel,
} from "src/app/store/models/plant.model";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
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
  @Output() CategoryChanged = new EventEmitter<any>();
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  categories: CategoriesModel[];
  selectedButton: string = "";
  category: CategoriesModel[];
  assetCategory: AssetCategoryModel;

  constructor() {
    this.category = [];
    this.categories = [];
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
    this.store.select("categories").subscribe({
      next: (categories: CategoriesModel[]) => {
        this.categories = [...categories];
        this.categories.sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          return 0;
        });
      },
    });
  }

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }

  handleCategory = (categoryType: string) => {
    this.assetCategory[categoryType as keyof AssetCategoryModel] = true;
    // this.category.push(
    //   this.assetCategory[categoryType as keyof AssetCategoryModel],
    // );
    console.log(this.assetCategory);
    this.selectedButton = categoryType;
  };

  categorySubmit = () => {
    this.CategoryChanged.emit(this.assetCategory);
  };
}
