import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
  model,
  Output,
  EventEmitter,
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
  IonBackdrop,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
  Filter,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { LoadingController } from "@ionic/angular";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { LoadingSkeletonComponent } from "../../../components/loading-skeleton/loading-skeleton.component";
import { ApprovalAssetFilterModalComponent } from "../../../components/approval-asset-filter-modal/approval-asset-filter-modal.component";

@Component({
  standalone: true,
  selector: "app-asset-approval",
  templateUrl: "./asset-approval.page.html",
  styleUrls: ["./asset-approval.page.scss"],
  imports: [
    IonBackdrop,
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
    ApprovalAssetFilterModalComponent,
  ],
})
export class AssetApprovalPage implements OnInit {
  siteId: string;
  assets: any[];
  filter: Filter;
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

  filteredAssets: AssetModel[];
  store = inject(Store);
  radioChecked = model();
  sendForApproval: any[] = [];
  requestedAssets: AssetModel[];
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isFilterMenuOpen: boolean = false;
  isApprovalMenuOpen: boolean = false;
  draftFilteredAssets: AssetModel[];
  filterCounts: number;
  isLoading: WritableSignal<boolean> = signal(false);
  filterAbleAssets: any[];

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
    this.filterCounts = 0;
    this.filteredAssets = [];
    this.draftFilteredAssets = [];
    this.isApprovalMenuOpen = false;
    this.assets = [];
    this.filterAbleAssets = [];
  }

  ngOnInit() {
    this.draftFilteredAssets = this.assets;
    this.filterAbleAssets = this.assets;
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

  handleFilterModal = (event: any, filter: any) => {
    this.isFilterMenuOpen = event;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  };

  handlefilterby = (assetFilter: any) => {
    console.log(this.filterAbleAssets);

    this.filter = assetFilter;
    console.log(this.filter);
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    const getSelectedCount = (array: any) => {
      return array.reduce((count: any, item: any) => {
        return count + (item.isSelected ? 1 : 0);
      }, 0);
    };

    const countSelectedItems = (filter: any) => {
      let totalCount = 0;
      for (const categoryKey in filter) {
        if (filter.hasOwnProperty(categoryKey)) {
          totalCount += filter[categoryKey].reduce((acc: any, item: any) => {
            return acc + (item.isSelected ? 1 : 0);
          }, 0);
        }
      }
      return totalCount;
    };

    this.filterCounts = countSelectedItems(assetFilter);

    // Get the count of selected items in each category
    const counts = {
      assetType: getSelectedCount(assetFilter.assetType),
      assetArea: getSelectedCount(assetFilter.assetArea),
      assetSource: getSelectedCount(assetFilter.assetSource),
      assetStatus: getSelectedCount(assetFilter.assetStatus),
    };

    // assetType filter type
    const filteredByType =
      assetFilter.assetType.length === 0
        ? this.filterAbleAssets
        : this.filterAbleAssets.filter((asset: any) => {
            return assetFilter.assetType.some(
              (type: any) =>
                type.isSelected && type.type === asset.assetInfo.assetType,
            );
          });

    // assetArea filter type
    const filteredByArea =
      assetFilter.assetArea.length === 0
        ? this.filterAbleAssets
        : this.filterAbleAssets.filter((asset: any) => {
            return assetFilter.assetArea.some(
              (type: any) =>
                type.isSelected && type.area === asset.assetArea.area,
            );
          });

    // source filter type
    const filteredBySource =
      assetFilter.assetSource.length === 0
        ? this.filterAbleAssets
        : this.filterAbleAssets.filter((asset: any) => {
            return assetFilter.assetSource.some(
              (source: any) =>
                source.isSelected && asset.assetSource[source.type],
            );
          });

    // status filter type
    const filteredByStatus =
      assetFilter.assetStatus.length === 0
        ? this.filterAbleAssets
        : this.filterAbleAssets.filter((asset: any) => {
            return assetFilter.assetStatus.some(
              (status: any) =>
                status.isSelected && asset.assetStatus.status[status.type],
            );
          });

    this.filteredAssets = this.filterAbleAssets.filter((asset: any) => {
      const passesTypeFilter = filteredByType.includes(asset);
      const passesAreaFilter = filteredByArea.includes(asset);
      const passesSourceFilter = filteredBySource.includes(asset);
      const passesStatusFilter = filteredByStatus.includes(asset);

      // single filter
      if (
        counts.assetType !== 0 &&
        counts.assetSource === 0 &&
        counts.assetStatus === 0 &&
        counts.assetArea === 0
      ) {
        return passesTypeFilter;
      } else if (
        counts.assetType === 0 &&
        counts.assetSource !== 0 &&
        counts.assetStatus === 0 &&
        counts.assetArea === 0
      ) {
        return passesSourceFilter;
      } else if (
        counts.assetType === 0 &&
        counts.assetSource === 0 &&
        counts.assetStatus === 0 &&
        counts.assetArea !== 0
      ) {
        return passesAreaFilter;
      } else if (
        counts.assetType === 0 &&
        counts.assetSource === 0 &&
        counts.assetStatus !== 0 &&
        counts.assetArea === 0
      ) {
        return passesStatusFilter;
      }
      // multiple filter
      else if (
        counts.assetType !== 0 &&
        counts.assetSource !== 0 &&
        counts.assetStatus === 0 &&
        counts.assetArea === 0
      ) {
        return passesTypeFilter && passesSourceFilter;
      } else if (
        counts.assetType !== 0 &&
        counts.assetSource === 0 &&
        counts.assetStatus !== 0 &&
        counts.assetArea === 0
      ) {
        return passesStatusFilter && passesTypeFilter;
      } else if (
        counts.assetType === 0 &&
        counts.assetSource !== 0 &&
        counts.assetStatus !== 0 &&
        counts.assetArea === 0
      ) {
        return passesStatusFilter && passesSourceFilter;
      } else
        return passesTypeFilter && passesSourceFilter && passesStatusFilter;
    });

    this.draftFilteredAssets = [];
    this.draftFilteredAssets = this.filteredAssets;
    console.log(this.filteredAssets);
    console.log(this.draftFilteredAssets);
  };
}
