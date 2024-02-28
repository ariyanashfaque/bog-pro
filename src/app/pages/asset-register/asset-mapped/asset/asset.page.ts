import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonGrid,
  IonIcon,
  IonTitle,
  IonInput,
  IonLabel,
  IonHeader,
  IonButton,
  IonSelect,
  IonFooter,
  IonContent,
  IonToolbar,
  IonSegment,
  IonButtons,
  IonBackdrop,
  IonTextarea,
  IonActionSheet,
  IonSelectOption,
  IonSegmentButton,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  EventEmitter,
  WritableSignal,
} from "@angular/core";
import {
  AssetsModel,
  PlantsModel,
  AssetsResponse,
  AssetCategoryModel,
} from "src/app/store/models/plant.model";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_ASSET } from "src/app/store/actions/plant.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { AssetCategorySelectModalComponent } from "src/app/components/asset-category-select-modal/asset-category-select-modal.component";

@Component({
  standalone: true,
  selector: "app-asset",
  templateUrl: "./asset.page.html",
  styleUrls: ["./asset.page.scss"],
  imports: [
    IonCol,
    IonRow,
    IonImg,
    IonIcon,
    IonGrid,
    IonText,
    IonLabel,
    IonInput,
    IonTitle,
    IonFooter,
    IonButton,
    IonHeader,
    IonSelect,
    IonButtons,
    IonSegment,
    IonToolbar,
    IonContent,
    IonTextarea,
    IonBackdrop,
    FormsModule,
    IonActionSheet,
    HeaderComponent,
    IonSelectOption,
    IonSegmentButton,
    ReactiveFormsModule,
    AssetCategorySelectModalComponent,
  ],
})
export class AssetPage implements OnInit {
  store = inject(Store);

  segment: string;
  asset?: AssetsModel;
  isMenuOpen: boolean;
  assetRegistrationForm: FormGroup;
  httpService = inject(HttpService);
  assetCategory?: AssetCategoryModel;
  toastService = inject(ToastService);
  assetInDraft: { id?: string; asset?: AssetsModel };
  isLoading: WritableSignal<boolean> = signal(false);
  isMenuToggleOpen = new EventEmitter<boolean>(false);
  isFormValid: WritableSignal<boolean> = signal(false);

  @Input()
  set id(plantId: string) {
    this.assetInDraft.id = plantId;
  }

  @Input()
  set assetId(assetId: string) {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant.assets) {
          this.asset = plant.assets.find((asset) => asset.id === assetId);
          this.assetRegistrationForm.patchValue({
            ...this.asset?.assetInfo,
            assetId: this.asset?.id,
          });
        }
      },
    });
  }

  constructor() {
    this.asset = {};
    this.assetInDraft = {};
    this.assetCategory = {};
    this.isMenuOpen = false;
    this.segment = "custom1";

    this.assetRegistrationForm = new FormGroup({
      sapId: new FormControl(""),
      assetType: new FormControl(""),
      assetImages: new FormControl(""),
      assetLocation: new FormControl(""),
      assetParentType: new FormControl(""),
      assetName: new FormControl("", Validators.required),
      costCenter: new FormControl("", Validators.required),
      assetStatus: new FormControl("", Validators.required),
      assetId: new FormControl({ value: "", disabled: true }),
    });
  }

  ngOnInit() {
    this.assetRegistrationForm.valueChanges.subscribe({
      next: () => {
        if (this.assetRegistrationForm.valid) {
          this.isFormValid.set(true);
          this.asset = {
            id: this.asset?.id,
            assetInfo: this.assetRegistrationForm.value,
          };
          this.assetInDraft.asset = this.asset;
        } else {
          this.isFormValid.set(false);
        }
      },
    });
  }
  handleChange(event: any) {
    this.segment = event?.detail?.value;
  }

  handleMenuToggle = () => {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  };

  handleErrorModal = (event: any) => {
    this.isMenuOpen = event;
  };

  CategoryChanged(event: AssetCategoryModel) {
    if (this.asset) {
      this.asset.assetCategories = event;
    }

    console.log(this.asset);
  }
  handleSubmit(): void {}

  handleSendForApproval() {
    this.httpService.UpdateAsset({ plant: this.assetInDraft }).subscribe({
      next: (response: AssetsResponse) => {
        // plant: response?.data,

        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
