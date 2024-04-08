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
  effect,
  model,
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
  selector: "app-asset-info-menu",
  templateUrl: "./asset-info-menu.component.html",
  styleUrls: ["./asset-info-menu.component.scss"],
  standalone: true,
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
})
export class AssetInfoMenuComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  assetDummy = model<any>({});
  subAssetActiveIndex = model<number>(-1);

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }

  nextButton() {
    this.subAssetActiveIndex.update(
      (subAssetActiveIndex) => subAssetActiveIndex + 1
    );
  }

  // from other component
  plantId: string;
  segment: string;
  asset: AssetsModel;
  store = inject(Store);
  router = inject(Router);
  assetRegistrationForm: FormGroup;
  httpService = inject(HttpService);
  assetCategory: AssetCategoryModel;
  toastService = inject(ToastService);
  loadingCtrl = inject(LoadingController);
  @Input() isApprovalMenuOpen: boolean = false;
  isFormValid: WritableSignal<boolean> = signal(false);
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
  }

  @Input()
  set assetId(assetId: string) {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant.assets) {
          this.asset = plant.assets.find((asset) => asset.id === assetId) ?? {};
          this.assetRegistrationForm.patchValue({ ...this.asset?.assetInfo });
        }
      },
    });
  }

  constructor() {
    this.asset = {};
    this.plantId = "";
    this.segment = "info";
    this.assetCategory = {};
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
  }
  // menuToggle() {
  //   this.isApprovalMenuOpen = !this.isApprovalMenuOpen;
  //   this.isMenuToggleOpen.emit(this.isApprovalMenuOpen);
  // }

  handleSelectedCategory(event: CategoriesModel[]) {
    this.isApprovalMenuOpen = false;
    this.asset = { ...this.asset, assetCategories: event };
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
