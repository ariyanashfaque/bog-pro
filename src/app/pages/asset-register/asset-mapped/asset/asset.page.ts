import {
  FormGroup,
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

  @Input()
  set assetId(assetId: string) {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant.assets)
          this.asset = plant.assets.find((asset) => asset.id === assetId);
      },
    });
  }

  constructor() {
    this.asset = {};
    this.isMenuOpen = false;
    this.segment = "custom1";
  }

  ngOnInit() {}

  handleChange(event: any) {
    this.segment = event?.detail?.value;
  }
  onShow(): void {
    console.log(this.assetForm.value);
  }

  handleMenuToggle = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  assetForm: FormGroup = new FormGroup({
    assetId: new FormControl(),
    sapId: new FormControl(""),
    assetname: new FormControl(""),
    costCenter: new FormControl(""),
    assetStatus: new FormControl(""),
    assetCategory: new FormControl([]),
  });
}
