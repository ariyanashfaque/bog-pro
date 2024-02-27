import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
  IonContent,
  IonToolbar,
  IonSegment,
  IonActionSheet,
  IonSelectOption,
  IonSegmentButton,
  IonBackdrop,
  IonTextarea,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import {
  AssetCategoryModel,
  AssetsModel,
  PlantsModel,
} from "src/app/store/models/plant.model";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AssetRegistrationFooterComponent } from "src/app/components/asset-registration-footer/asset-registration-footer.component";
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
    IonButton,
    IonHeader,
    IonSelect,
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
    AssetRegistrationFooterComponent,
    AssetCategorySelectModalComponent,
  ],
})
export class AssetPage implements OnInit {
  store = inject(Store);

  segment: string;
  asset?: AssetsModel;
  isMenuOpen: boolean;
  isFormValid: boolean;
  assetRegistrationForm: FormGroup;
  assetCategory?: AssetCategoryModel;
  isMenuToggleOpen = new EventEmitter<boolean>(false);

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
    this.assetCategory = {};
    this.isMenuOpen = false;
    this.isFormValid = false;
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
      next: (value) => {
        if (this.assetRegistrationForm.valid) {
          this.isFormValid = true;
        } else {
          this.isFormValid = false;
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
}
