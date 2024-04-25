import {
  Input,
  OnInit,
  inject,
  signal,
  Output,
  Component,
  EventEmitter,
  WritableSignal,
} from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonItem,
  IonIcon,
  IonText,
  IonLabel,
  IonTitle,
  IonHeader,
  IonToggle,
  IonButton,
  IonContent,
  IonToolbar,
  IonSegment,
  IonBackdrop,
  IonCardTitle,
  IonAccordion,
  IonCardHeader,
  IonSegmentButton,
  IonAccordionGroup,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetFilterModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { AssetMappedCardComponent } from "src/app/components/asset-mapped-card/asset-mapped-card.component";
import { AssetApprovalModalComponent } from "../../../components/asset-approval-modal/asset-approval-modal.component";
import { AssetMappedFilterModalComponent } from "../../../components/asset-mapped-filter-modal/asset-mapped-filter-modal.component";

@Component({
  standalone: true,
  selector: "app-asset-mapped",
  templateUrl: "./asset-mapped.page.html",
  styleUrls: ["./asset-mapped.page.scss"],
  imports: [
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonItem,
    IonCard,
    IonGrid,
    IonTitle,
    IonLabel,
    IonButton,
    IonToggle,
    IonHeader,
    IonSegment,
    IonToolbar,
    IonContent,
    IonBackdrop,
    IonAccordion,
    IonCardTitle,
    IonCardHeader,
    HeaderComponent,
    IonSegmentButton,
    IonAccordionGroup,
    LoadingSkeletonComponent,
    AssetMappedCardComponent,
    AssetApprovalModalComponent,
    AssetMappedFilterModalComponent,
  ],
})
export class AssetMappedPage implements OnInit {
  store = inject(Store);
  httpService = inject(HttpService);
  toastService = inject(ToastService);

  assetId: string;
  plantId: string;
  assetFilters: any;
  assets: AssetModel[];
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  filteredAsset: AssetModel[];
  registeredAssets: AssetModel[];
  FilterByTypeAssets: AssetModel[];
  draftFilteredAssets: AssetModel[];
  isFilterMenuOpen: boolean = false;
  isApprovalMenuOpen: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

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
    this.plantId = "";
    this.assetId = "";
    this.draftAssets = [];
    this.filteredAsset = [];
    this.toggleChecked = true;
    this.registeredAssets = [];
    this.FilterByTypeAssets = [];
    this.draftFilteredAssets = [];
    this.isApprovalMenuOpen = false;
    this.assetFilters = {};
    // this.assetFilter = {};

    // this.assetFilter = {
    //   assetType: ["roof"],
    //   assetArea: ["zone1", "zone2"],

    //   assetSoruce: {
    //     assetSapSync: false,
    //     assetBulkUpload: false,
    //     assetManualCreation: true,
    //   },
    //   assetStatus: {
    //     assetInDraft: false,
    //     assetRejected: false,
    //     assetApproved: false,
    //     assetApprovalPendinng: true,
    //   },
    // };
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        console.log(plant.assets);
        if (plant?.assets) {
          this.assets = plant.assets;
          plant.assets?.forEach((asset) => {
            if (asset?.assetStatus?.isDraft) {
              this.draftAssets.push(asset);
            }
            if (asset?.assetStatus?.isRegistered) {
              this.registeredAssets.push(asset);
            }
          });
        }
      },
    });
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };

  handleFilterModal = (event: any) => {
    this.isFilterMenuOpen = event;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  };

  handlefilterby = (assetFilter: any) => {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;

    this.draftFilteredAssets = this.draftAssets.filter((asset: any) => {
      const isSourceSelected = assetFilter.assetSource.some(
        (source: any) => source.isSelected && asset.assetSource[source.type],
      );

      const isTypeSelected = assetFilter.assetType.some(
        (type: any) =>
          type.isSelected && type.type === asset.assetInfo.assetType,
      );

      const isStatusSelected = assetFilter.assetStatus.some(
        (status: any) =>
          status.isSelected && asset.assetStatus.status[status.type],
      );

      if (isTypeSelected && isSourceSelected && isStatusSelected)
        return isTypeSelected && isSourceSelected && isStatusSelected;

      // if (isTypeSelected) return isTypeSelected;
      // if (isSourceSelected) return isSourceSelected;
      // if (isStatusSelected) return isStatusSelected;
    });

    console.log(this.draftFilteredAssets);
  };

  // handleApplyFilter(asset: any): boolean {
  //   const isSourceSelected = this.assetFilters.assetSource.some(
  //     (source: any) => source.isSelected && asset.assetSource[source.type],
  //   );
  //   console.log(isSourceSelected);

  //   const isTypeSelected = this.assetFilters.assetType.some(
  //     (type: any) => type.isSelected && type.type === asset.assetInfo.assetType,
  //   );

  //   const isStatusSelected = this.assetFilters.assetStatus.some(
  //     (status: any) =>
  //       status.isSelected && asset.assetStatus.status[status.type],
  //   );

  //   return isTypeSelected && isSourceSelected && isStatusSelected;

  //   // console.log(filteredAssets);
  // }

  handleAssetId = (event: any) => {
    this.assetId = event;
  };

  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;
  }
}
