import { Component, OnInit } from "@angular/core";
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
  ],
})
export class AssetPage implements OnInit {
  segment: string = "custom1";

  constructor() {}

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
