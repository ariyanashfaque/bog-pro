import { Component, Input, OnInit, inject } from "@angular/core";
import {
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonGrid,
  IonIcon,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonSelect,
  IonContent,
  IonToolbar,
  IonSegment,
  IonSelectOption,
  IonSegmentButton,
} from "@ionic/angular/standalone";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AssetRegistrationFooterComponent } from "src/app/components/asset-registration-footer/asset-registration-footer.component";
import { Store } from "@ngrx/store";
import { ADD_ASSET, UPDATE_ASSET } from "src/app/store/actions/plant.action";
import { AssetsModel, PlantsModel } from "src/app/store/models/plant.model";

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
    IonInput,
    IonTitle,
    IonButton,
    IonHeader,
    IonSelect,
    IonSegment,
    IonToolbar,
    IonContent,
    FormsModule,
    HeaderComponent,
    IonSelectOption,
    IonSegmentButton,
    ReactiveFormsModule,
    AssetRegistrationFooterComponent,
  ],
})
export class AssetPage implements OnInit {
  store = inject(Store);

  segment: string;
  asset?: AssetsModel;

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
    this.segment = "custom1";
  }

  ngOnInit() {}

  handleChange(event: any) {
    this.segment = event?.detail?.value;
  }
  onShow(): void {
    console.log(this.assetForm.value);
  }
  assetForm: FormGroup = new FormGroup({
    assetId: new FormControl(),
    sapId: new FormControl(""),
    assetname: new FormControl(""),
    costCenter: new FormControl(""),
    assetStatus: new FormControl(""),
    assetCategory: new FormControl([]),
  });
}
