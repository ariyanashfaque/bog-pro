import {
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  IonButton,
} from "@ionic/angular/standalone";
import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  input,
  signal,
} from "@angular/core";
import { PlantsModel } from "src/app/store/models/plant.model";
import { DatePipe } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-plant-card",
  templateUrl: "./plant-card.component.html",
  styleUrls: ["./plant-card.component.scss"],
  imports: [IonButton, IonGrid, IonRow, IonIcon, IonCol, DatePipe],
})
export class PlantCardComponent implements OnInit {
  @Input() plant: PlantsModel;

  isApprovedAssets: boolean = false;
  isRejectedAssets: boolean = false;
  isMappedAssets: boolean = false;

  // isAssetZero: boolean = false;

  constructor() {
    this.plant = {};
  }

  ngOnInit() {
    console.log(this.plant);

    if (this.plant.totalApprovedAssets != 0) {
      this.isApprovedAssets = true;
    }

    if (this.plant.totalRejectedAssets != 0) {
      this.isRejectedAssets = true;
    }

    if (this.plant.totalMappedAssets != 0) {
      this.isMappedAssets = true;
    }

    // this.plant.values.forEach((i: any) => {
    //   this.assetValues.push(i);
    // });

    // this.assetValues.forEach((asset) => {
    //   if (plant.totalMappedAssets === "Asset Approved") {
    //     asset.bgColor = "bg-green-600";
    //   }
    //   if (asset.status === "Asset Rejected By Approver") {
    //     asset.bgColor = "bg-rose-500";
    //   }
    //   if (asset.status === "Asset Registeration Pending") {
    //     asset.bgColor = "bg-orange-500";
    //   }
    //   if (asset.status === "Asset Approval Pending") {
    //     asset.bgColor = "bg-amber-400";
    //   }
    // });
  }

  handleMenuToggle = () => {};
}
