import {
  IonIcon,
  IonTitle,
  IonFooter,
  IonButton,
  IonToolbar,
  IonButtons,
} from "@ionic/angular/standalone";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-asset-registration-footer",
  templateUrl: "./asset-registration-footer.component.html",
  styleUrls: ["./asset-registration-footer.component.scss"],
  imports: [IonIcon, IonButton, IonButtons, IonToolbar, IonFooter, IonTitle],
})
export class AssetRegistrationFooterComponent implements OnInit {
  @Input() isFormValid: boolean;
  constructor() {
    this.isFormValid = false;
  }

  ngOnInit() {
    console.log(this.isFormValid);
  }
}
