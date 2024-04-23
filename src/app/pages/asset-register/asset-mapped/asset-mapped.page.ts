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
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
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
  assetId: string;
  plantId: string;
  assetFilter: any;
  assets: AssetModel[];
  store = inject(Store);
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  filteredAsset: AssetModel[];
  registeredAssets: AssetModel[];
  FilterByTypeAssets: AssetModel[];
  httpService = inject(HttpService);
  isFilterMenuOpen: boolean = false;
  toastService = inject(ToastService);
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
    this.FilterByTypeAssets = [];
    this.toggleChecked = true;
    this.registeredAssets = [];
    this.isApprovalMenuOpen = false;

    this.assetFilter = {
      assetType: ["silo", "roof"],
      assetArea: ["zone1", "zone2"],

      assetSoruce: {
        assetSapSync: true,
        assetBulkUpload: false,
        assetManualCreation: false,
      },
      assetStatus: {
        assetInDraft: false,
        assetRejected: false,
        assetApproved: false,
        assetApprovalPendinng: true,
      },
    };
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;
          plant.assets?.forEach((asset) => {
            if (asset?.assetStatus?.isDraft) {
              this.draftAssets.push(asset);
              console.log(asset);
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

  handlefilterby = (event: any) => {
    // this.filteredAsset = this.draftAssets.filter((assets: any) => {
    //   const selectedAssetTypes = this.FilterByTypeAssets.forEach(
    //     (item: any) => {
    //       item.filterType === assets.assetInfo.assetType;
    //     },
    //   );
    //   console.log(selectedAssetTypes);
    // });
    // this.draftAssets.filter(item=>{
    //   this.FilterByTypeAssets.forEach(type=>{
    //     typeof item
    //   })
    // })
    // this.FilterByTypeAssets.map((asset: any) => {
    //   console.log(asset);
    // asset.filters.forEach((a: any) => {
    //   console.log(a);
    // });
    // asset.forEach(element => {
    // });
    // this.draftAssets = [];
    // this.isFilterMenuOpen = false;
    // this.FilterByTypeAssets.forEach((assets: any) => {
    //   assets.forEach((asset: any) => {
    //     if (asset?.assetStatus?.isDraft) {
    //       this.draftAssets.push(asset);
    //     }
    //   });
    // });
  };

  handleAssetId = (event: any) => {
    this.assetId = event;
  };

  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;
  }

  handleApplyFilter(asset: any): boolean {
    const assetTypeMatch = this.assetFilter.assetType.includes(
      asset.assetInfo.assetType,
    );

    const assetSourceMatch = Object.keys(this.assetFilter.assetSoruce).every(
      (key) => this.assetFilter.assetSoruce[key] === asset.assetSource[key],
    );

    const assetStatusMatch = Object.keys(this.assetFilter.assetStatus).every(
      (key) =>
        this.assetFilter.assetStatus[key] === asset.assetStatus.status[key],
    );

    return assetStatusMatch && assetTypeMatch && assetSourceMatch;
  }
}
