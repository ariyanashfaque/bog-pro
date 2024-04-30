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
  IonTitle,
  IonToggle,
  IonButton,
  IonFooter,
  IonContent,
  IonButtons,
  IonToolbar,
  IonCheckbox,
  IonThumbnail,
  IonRadioGroup,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { LoadingController } from "@ionic/angular";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { LoadingSkeletonComponent } from "../../../components/loading-skeleton/loading-skeleton.component";

@Component({
  standalone: true,
  selector: "app-asset-approval",
  templateUrl: "./asset-approval.page.html",
  styleUrls: ["./asset-approval.page.scss"],
  imports: [
    IonImg,
    IonCol,
    IonRow,
    IonIcon,
    IonText,
    IonGrid,
    IonTitle,
    IonLabel,
    IonRadio,
    IonBadge,
    IonFooter,
    IonButton,
    IonToggle,
    IonButtons,
    IonToolbar,
    IonContent,
    IonCheckbox,
    IonThumbnail,
    IonRadioGroup,
    IonSkeletonText,
    HeaderComponent,
    LoadingSkeletonComponent,
  ],
})
export class AssetApprovalPage implements OnInit {
  siteId: string;
  assetId: string;
  assets: AssetModel[];
  store = inject(Store);
  radioChecked = model();
  sendForApproval: any[] = [];
  requestedAssets: AssetModel[];
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isFilterMenuOpen: boolean = false;
  isApprovalMenuOpen: boolean = false;
  // isFilterToggleOpen: WritableSignal<boolean> = signal(false);
  draftFilteredAssets: AssetModel[];

  isLoading: WritableSignal<boolean> = signal(false);

  @Input()
  set id(siteId: string) {
    this.siteId = siteId;
    this.isLoading.set(true);
    this.httpService.GetRequestedAssets({ siteId }).subscribe({
      next: (response: AssetsResponseModel) => {
        this.assets = response.data;
        console.log(this.assets);
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

  constructor(private loadingCtrl: LoadingController) {
    this.assets = [];
  }

  ngOnInit() {}

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

  //Asset approval API
  async hanldeAssetsApproval() {
    if (this.sendForApproval.length) {
      let plantId = this.siteId;
      let assets: any[] = [];

      this.sendForApproval.forEach((_assetId) => {
        assets.push(_assetId?.id);
      });

      const loading = await this.loadingCtrl.create({
        spinner: "bubbles",
        keyboardClose: true,
      });
      loading.present();
      this.httpService.AssetApproval({ plantId, assets }).subscribe({
        next: (response: AssetsResponseModel) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          loading.dismiss();
          this.toastService.toastFailed(error.error.message);
        },
        complete: () => {
          loading.dismiss();
          this.toastService.toastSuccess(
            "Asset" +
              (this.sendForApproval.length > 1 ? "s" : "") +
              "approved successfully",
          );
        },
      });
    } else {
      this.toastService.toastFailed("Select assets for approval !!");
    }
  }

  async handleAssetsApprovalRejection() {
    if (this.sendForApproval.length) {
      let plantId = this.siteId;
      let assets: string[] = [];
      let rejectionNote: string[] = [];

      this.sendForApproval.forEach((_assetId) => {
        assets.push(_assetId?.id);
      });

      const loading = await this.loadingCtrl.create({
        spinner: "bubbles",
        keyboardClose: true,
      });
      loading.present();
      this.httpService
        .AssetRejection({ plantId, assets, rejectionNote })
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error: HttpErrorResponse) => {
            loading.dismiss();
            this.toastService.toastFailed(error.error.message);
          },
          complete: () => {
            loading.dismiss();
            this.toastService.toastSuccess(
              "Asset" +
                (this.sendForApproval.length > 1 ? "s" : "") +
                "rejected !!",
            );
          },
        });
    } else {
      this.toastService.toastFailed("Select assets for approval !!");
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
