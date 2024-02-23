import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { HeaderComponent } from "src/app/components/header/header.component";
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
    AssetCategorySelectModalComponent,
  ],
})
export class AssetPage implements OnInit {
  segment: string = "custom1";
  isMenuOpen: boolean = false;
  // @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {}

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
