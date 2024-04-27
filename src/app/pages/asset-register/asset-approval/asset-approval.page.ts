import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
  model,
} from "@angular/core";
import {
  IonCol,
  IonRow,
  IonImg,
  IonGrid,
  IonText,
  IonIcon,
  IonBadge,
  IonRadio,
  IonLabel,
  IonToggle,
  IonButton,
  IonContent,
  IonRadioGroup,
  IonCheckbox,
  IonFooter,
  IonToolbar,
  IonTitle,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";

import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";

@Component({
  standalone: true,
  selector: "app-asset-approval",
  templateUrl: "./asset-approval.page.html",
  styleUrls: ["./asset-approval.page.scss"],
  imports: [
    IonTitle,
    IonToolbar,
    IonFooter,
    IonCheckbox,
    IonImg,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonGrid,
    IonLabel,
    IonRadio,
    IonBadge,
    IonButton,
    IonToggle,
    IonContent,
    IonRadioGroup,
    HeaderComponent,
  ],
})
export class AssetApprovalPage implements OnInit {
  assetId: string;
  plantId: string;
  assets: AssetModel[];
  store = inject(Store);
  sendForApproval: any[] = [];
  radioChecked = model();
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isFilterMenuOpen: boolean = false;
  isApprovalMenuOpen: boolean = false;
  // isFilterToggleOpen: WritableSignal<boolean> = signal(false);
  draftFilteredAssets: AssetModel[];

  isLoading: WritableSignal<boolean> = signal(false);
  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
    this.isLoading.set(true);
    this.httpService.GetAllAssets({ plantId }).subscribe({
      next: (response: AssetsResponseModel) => {
        this.store.dispatch(
          UPDATE_PLANT({
            assets: response?.data,
          }),
        );
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

  constructor() {
    this.assets = [];
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;
        }
      },
    });
    console.log(this.assets);

    console.log("assets:", this.assets);
  }

  selectAllAsset(event: CustomEvent) {
    this.radioChecked.set(event.detail.checked);

    if (event.detail.checked === true) {
      this.sendForApproval = this.assets;
    } else {
      this.sendForApproval = [];
    }
  }

  assetChecked(event: any, asset: any) {
    if (event.detail.checked === true) {
      this.sendForApproval.push(asset);
    } else {
      this.sendForApproval.pop();
    }
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };

  handleFilterModal = (event: any) => {
    this.isFilterMenuOpen = event;
    // this.isFilterToggleOpen.set(this.isFilterMenuOpen);
    console.log(this.isFilterMenuOpen);
  };

  handlefilterby = (assetFilter: any) => {
    // console.log(assetFilter);
    // this.isFilterMenuOpen = !this.isFilterMenuOpen;
    // console.log(assetFilter);
    // this.draftFilteredAssets = this.assets.filter((asset: any) => {
    //   const isSourceSelected = assetFilter.assetSource.some(
    //     (source: any) => source.isSelected && asset.assetSource[source.type],
    //   );
    //   let selectedCount = 1;
    //   const isTypeSelected = assetFilter.assetType.some(
    //     (type: any) =>
    //       type.isSelected && type.type === asset.assetInfo.assetType,
    //     // if (type.isSelected) {
    //     //   selectedCount++;
    //     // }
    //   );
    //   const isStatusSelected = assetFilter.assetStatus.some(
    //     (status: any) =>
    //       status.isSelected && asset.assetStatus.status[status.type],
    //   );
    //   if (isTypeSelected && isSourceSelected && isStatusSelected)
    //     return isTypeSelected && isSourceSelected && isStatusSelected;
    //   // if (selectedCount <= 1) return isTypeSelected;
    //   // else if(selectedCount <= 1) return isSourceSelected;
    //   // else if (selectedCount <= 1) return isStatusSelected;
    //   // if (isTypeSelected) return isTypeSelected;
    //   // if (isSourceSelected) return isSourceSelected;
    //   // if (isStatusSelected) return isStatusSelected;
    // });
    // console.log(this.draftFilteredAssets);
  };
}
