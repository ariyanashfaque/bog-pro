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
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { Component, Input, OnInit, inject } from "@angular/core";
import { AssetsModel, PlantsModel } from "src/app/store/models/plant.model";
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
  assetRegistrationForm: FormGroup;

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
    this.isMenuOpen = false;
    this.segment = "custom1";
    this.assetRegistrationForm = new FormGroup({
      sapId: new FormControl(""),
      assetName: new FormControl("", Validators.required),
      assetType: new FormControl("", Validators.required),
      costCenter: new FormControl("", Validators.required),
      assetStatus: new FormControl("", Validators.required),
      assetImages: new FormControl("", Validators.required),
      assetId: new FormControl({ value: "", disabled: true }),
      assetLocation: new FormControl("", Validators.required),
      assetParentType: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  handleChange(event: any) {
    this.segment = event?.detail?.value;
  }

  handleMenuToggle = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  handleSubmit(): void {}
}
