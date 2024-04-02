import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  WritableSignal,
  inject,
  input,
  signal,
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
  IonHeader,
  IonItem,
  IonLabel,
  IonIcon,
  IonImg,
  IonRow,
  IonModal,
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonList,
  IonFooter,
  IonButtons,
  IonGrid,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonInput,
  IonText,
  IonSegmentButton,
  IonSegment,
  LoadingController,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { UPDATE_ASSET } from "src/app/store/actions/plant.action";
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
  @Input() isApprovalMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  store = inject(Store);
  router = inject(Router);
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  loadingCtrl = inject(LoadingController);

  plantId: string;
  segment: string;
  asset: AssetsModel;
  assetRegistrationForm: FormGroup;
  assetCategory: AssetCategoryModel;
  isFormValid: WritableSignal<boolean> = signal(false);

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
      assetType: new FormControl(""),
      assetImages: new FormControl(""),
      assetLocation: new FormControl(""),
      assetParentType: new FormControl(""),
      assetName: new FormControl("", Validators.required),
      costCenter: new FormControl("", Validators.required),
      assetStatus: new FormControl("", Validators.required),
      assetId: new FormControl(""),
      hacCode: new FormControl(""),

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
  menuToggle() {
    this.isApprovalMenuOpen = !this.isApprovalMenuOpen;
    this.isMenuToggleOpen.emit(this.isApprovalMenuOpen);
  }

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
