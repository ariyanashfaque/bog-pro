import { HttpErrorResponse } from "@angular/common/http";
import {
  Input,
  OnInit,
  Output,
  inject,
  signal,
  Component,
  EventEmitter,
  WritableSignal,
} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonList,
  IonGrid,
  IonText,
  IonLabel,
  IonModal,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonFooter,
  IonSelect,
  IonContent,
  IonToolbar,
  IonButtons,
  IonSegment,
  IonTextarea,
  IonSelectOption,
  IonSegmentButton,
  LoadingController,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { UPDATE_ASSET } from "src/app/store/actions/plant.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import {
  AssetsModel,
  PlantsModel,
  AssetResponse,
  CategoriesModel,
  AssetCategoryModel,
} from "src/app/store/models/plant.model";

@Component({
  imports: [
    IonCol,
    IonImg,
    IonRow,
    IonText,
    IonGrid,
    IonList,
    IonItem,
    IonIcon,
    IonInput,
    IonTitle,
    IonModal,
    IonLabel,
    IonFooter,
    IonButton,
    IonHeader,
    IonSelect,
    IonSegment,
    IonButtons,
    IonToolbar,
    IonContent,
    IonTextarea,
    FormsModule,
    IonSelectOption,
    IonSegmentButton,
    ReactiveFormsModule,
  ],
  standalone: true,
  selector: "app-asset-approval-update-modal",
  templateUrl: "./asset-approval-update-modal.component.html",
  styleUrls: ["./asset-approval-update-modal.component.scss"],
})
export class AssetApprovalUpdateModalComponent implements OnInit {
  plantId: string;
  segment: string;
  asset: AssetsModel;
  store = inject(Store);
  router = inject(Router);
  categories: CategoriesModel[];
  selectedCategoryCount: number;
  assetRegistrationForm: FormGroup;
  httpService = inject(HttpService);
  assetCategory: AssetCategoryModel;
  toastService = inject(ToastService);
  selectedCategories: CategoriesModel[];
  loadingCtrl = inject(LoadingController);
  @Input() isApprovalMenuOpen: boolean = false;
  isFormValid: WritableSignal<boolean> = signal(false);
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  selectedCategoriesEmit = new EventEmitter<CategoriesModel[]>();
  // @Input() assetID: string;

  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
  }

  @Input()
  set assetID(assetID: string) {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant.assets) {
          this.asset = plant.assets.find((asset) => asset.id === assetID) ?? {};
          this.assetRegistrationForm.patchValue({ ...this.asset?.assetInfo });
        }
      },
    });
  }

  constructor() {
    this.categories = [
      {
        id: "ASSET001",
        order: 1,
        categorySelected: false,
        categoryType: "sim",
        categoryTitle: "Sim",
      },
      {
        id: "ASSET001",
        order: 3,
        categorySelected: false,
        categoryType: "quarry",
        categoryTitle: "Quarry",
      },
      {
        id: "ASSET002",
        order: 4,
        categorySelected: false,
        categoryType: "electrical",
        categoryTitle: "Electrical",
      },
      {
        id: "ASSET003",
        order: 7,
        categorySelected: false,
        categoryType: "environment",
        categoryTitle: "Environment",
      },
      {
        id: "ASSET004",
        order: 8,
        categorySelected: false,
        categoryType: "electrical",
        categoryTitle: "Electrical",
      },
      {
        id: "ASSET005",
        order: 5,
        categorySelected: false,
        categoryType: "hotMaterial",
        categoryTitle: "Hot Material",
      },
      {
        id: "ASSET006",
        order: 6,
        categorySelected: false,
        categoryType: "fireProtection",
        categoryTitle: "Fire Protection",
      },
      {
        id: "ASSET007",
        order: 2,
        categorySelected: false,
        categoryType: "materialManagement",
        categoryTitle: "Material Management",
      },
    ];
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

    this.asset = {};
    this.plantId = "";
    this.segment = "info";
    this.isApprovalMenuOpen = false;
    this.asset.assetCategories = [];

    this.assetRegistrationForm = new FormGroup({
      sapId: new FormControl(""),
      assetId: new FormControl(""),
      hacCode: new FormControl(""),
      assetType: new FormControl(""),
      assetImages: new FormControl(""),
      assetLocation: new FormControl(""),
      assetParentType: new FormControl(""),
      assetName: new FormControl("", Validators.required),
      costCenter: new FormControl("", Validators.required),
      assetStatus: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.store.select("categories").subscribe({
      next: (categories: CategoriesModel[]) => {
        console.log(categories);
      },
    });

    // this.store.select("categories").subscribe({
    //   next: (categories: CategoriesModel[]) => {
    //     this.categories = categories
    //       .map((category) => {
    //         if (
    //           this.selectedCategories &&
    //           this.selectedCategories.find(
    //             (selectedCategory) =>
    //               selectedCategory.id === category.id &&
    //               selectedCategory.categorySelected
    //           )
    //         ) {
    //           return {
    //             ...category,
    //             categorySelected: true,
    //           };
    //         } else {
    //           return {
    //             ...category,
    //             categorySelected: false,
    //           };
    //         }
    //       })
    //       .sort((a, b) => {
    //         if (a?.order > b.order) return 1;
    //         if (a.order < b.order) return -1;
    //         return 0;
    //       });

    //     console.log(this.categories);
    //   },
    // });

    this.selectedCategories = this.categories.map((category) => {
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
    });

    this.selectedCategoryCount = this.categories?.filter(
      (category) => category.categorySelected,
    ).length;

    console.log(this.selectedCategories);

    this.assetRegistrationForm.valueChanges.subscribe({
      next: () => {
        if (this.assetRegistrationForm.valid) {
          this.isFormValid.set(true);
          this.asset = {
            ...this.asset,
            id: this.asset?.id,
            assetSource: {
              sapSync: false,
              bulkUpload: false,
              manualCreation: true,
            },
            assetInfo: this.assetRegistrationForm.value,
          };
        } else {
          this.isFormValid.set(false);
        }
      },
    });
  }
  handleChange(event: any) {
    this.segment = event?.detail?.value;
    this.asset = { ...this.asset, assetCategories: event };
    console.log();
  }
  menuToggle() {
    this.isApprovalMenuOpen = !this.isApprovalMenuOpen;
    this.isMenuToggleOpen.emit(this.isApprovalMenuOpen);
  }

  handleCategory = (category: CategoriesModel) => {
    category.categorySelected = !category.categorySelected;
    this.selectedCategoryCount = this.categories?.filter(
      (category) => category.categorySelected,
    ).length;
    this.selectedCategoriesEmit.emit(this.categories);
  };

  handleSelectedCategory(event: CategoriesModel[]) {
    this.asset = { ...this.asset, assetCategories: event };
    console.log(this.asset);
  }

  handleSendForApproval = async () => {
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      spinner: "bubbles",
    });
    loading.present();

    this.httpService
      .AssetSendForApproval({ plantId: this.plantId, asset: this.asset })
      .subscribe({
        next: (response: AssetResponse) => {
          this.store.dispatch(UPDATE_ASSET(response.data));
        },
        error: (error: HttpErrorResponse) => {
          loading.dismiss();
          this.toastService.toastFailed(error.error.message);
          this.router.navigate([
            `/asset-register/asset-mapped/${this.plantId}`,
          ]);
        },
        complete: () => {
          loading.dismiss();
          this.router.navigate([
            `/asset-register/asset-mapped/${this.plantId}`,
          ]);
        },
      });
  };
}
