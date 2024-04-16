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
import { UPDATE_ASSET } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import {
  SiteModel,
  AssetModel,
  AssetResponseModel,
  AssetCategoryModel,
} from "src/app/store/models/asset.model";

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
  selector: "app-asset-approval-modal",
  templateUrl: "./asset-approval-modal.component.html",
  styleUrls: ["./asset-approval-modal.component.scss"],
})
export class AssetApprovalModalComponent implements OnInit {
  plantId: string;
  segment: string;
  asset: AssetModel;
  store = inject(Store);
  router = inject(Router);
  selectedCategoryCount: number;
  categories: AssetCategoryModel[];
  assetRegistrationForm: FormGroup;
  httpService = inject(HttpService);
  assetCategory: AssetCategoryModel;
  toastService = inject(ToastService);
  loadingCtrl = inject(LoadingController);
  selectedCategories: AssetCategoryModel[];
  @Input() isApprovalMenuOpen: boolean = false;
  isFormValid: WritableSignal<boolean> = signal(false);
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  selectedCategoriesEmit = new EventEmitter<AssetCategoryModel[]>();

  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
  }

  @Input()
  set assetID(assetID: string) {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant.assets) {
          console.log(plant.assets);
          
          this.asset = plant.assets.find((asset) => asset.id === assetID) ?? {};
          this.assetRegistrationForm.patchValue({ ...this.asset?.assetInfo });
        }
      },
    });
  }

  constructor() {
    this.categories = [
      {
        order: 1,
        isSelected: false,
        categoryType: "sim",
        categoryTitle: "Sim",
      },
      {
        order: 3,
        isSelected: false,
        categoryType: "quarry",
        categoryTitle: "Quarry",
      },
      {
        order: 4,
        isSelected: false,
        categoryType: "electrical",
        categoryTitle: "Electrical",
      },
      {
        order: 7,
        isSelected: false,
        categoryType: "environment",
        categoryTitle: "Environment",
      },
      {
        order: 8,
        isSelected: false,
        categoryType: "electrical",
        categoryTitle: "Electrical",
      },
      {
        order: 5,
        isSelected: false,
        categoryType: "hotMaterial",
        categoryTitle: "Hot Material",
      },
      {
        order: 6,
        isSelected: false,
        categoryType: "fireProtection",
        categoryTitle: "Fire Protection",
      },
      {
        order: 2,
        isSelected: false,
        categoryType: "materialManagement",
        categoryTitle: "Material Management",
      },
    ];
    this.selectedCategories = [];

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
      assetCostCenter: new FormControl("", Validators.required),
      assetStatus: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
    this.store.select("categories").subscribe({
      next: (categories: AssetCategoryModel[]) => {
        // console.log(categories);
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
          (selectedCategory) => selectedCategory.isSelected,
        )
      ) {
        return {
          ...category,
          isSelected: true,
        };
      } else {
        return {
          ...category,
          isSelected: false,
        };
      }
    });

    this.selectedCategoryCount = this.categories?.filter(
      (category) => category.isSelected,
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
              assetSapSync: false,
              assetBulkUpload: false,
              assetManualCreation: true,
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
  }
  menuToggle() {
    this.isApprovalMenuOpen = !this.isApprovalMenuOpen;
    this.isMenuToggleOpen.emit(this.isApprovalMenuOpen);
  }

  handleCategory = (category: AssetCategoryModel) => {
    category.isSelected = !category.isSelected;
    this.selectedCategoryCount = this.categories?.filter(
      (category) => category.isSelected,
    ).length;
    this.selectedCategoriesEmit.emit(this.categories);
  };

  handleSelectedCategory(event: AssetCategoryModel[]) {
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
        next: (response: AssetResponseModel) => {
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
