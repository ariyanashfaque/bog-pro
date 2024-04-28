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
  Filter,
  SiteModel,
  AssetModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
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

  filter: Filter;
  assetId: string;
  plantId: string;
  assets: AssetModel[];
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  registeredAssets: AssetModel[];
  draftFilteredAssets: AssetModel[];
  isFilterMenuOpen: boolean = false;
  isApprovalMenuOpen: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);
  filteredByType: AssetModel[];
  filteredBySource: AssetModel[];
  filteredByStatus: AssetModel[];
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
    this.toggleChecked = true;
    this.registeredAssets = [];
    this.draftFilteredAssets = [];
    this.isApprovalMenuOpen = false;
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

    this.draftAssets = this.draftFilteredAssets;
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };

  handleFilterModal = (event: any, filter: any) => {
    console.log(this.filter);
    this.isFilterMenuOpen = event;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  };

  // handlefilterby = (assetFilter: any) => {
  //   this.filter = assetFilter;
  //   this.isFilterMenuOpen = !this.isFilterMenuOpen;

  //   this.draftFilteredAssets = this.draftAssets.filter((asset: any) => {
  //     const isSourceSelected = assetFilter.assetSource.some(
  //       (source: any) => source.isSelected && asset.assetSource[source.type],
  //     );

  //     const isTypeSelected = assetFilter.assetType.some(
  //       (type: any) =>
  //         type.isSelected && type.type === asset.assetInfo.assetType,
  //     );

  //     const isStatusSelected = assetFilter.assetStatus.some(
  //       (status: any) =>
  //         status.isSelected && asset.assetStatus.status[status.type],
  //     );

  //     if (isTypeSelected && isSourceSelected && isStatusSelected)
  //       return isTypeSelected && isSourceSelected && isStatusSelected;
  //     // else if (isTypeSelected || isSourceSelected || isStatusSelected) {
  //     //   return isTypeSelected || isSourceSelected || isStatusSelected;
  //     // }
  //     else if (isSourceSelected && isStatusSelected && !isTypeSelected) {
  //       return isSourceSelected && isStatusSelected && !isTypeSelected;
  //     } else if (isSourceSelected && isTypeSelected) {
  //       return isSourceSelected && isTypeSelected;
  //     } else if (isTypeSelected && isStatusSelected) {
  //       return isTypeSelected && isStatusSelected;
  //     }
  //   });
  //   console.log(this.draftFilteredAssets);
  // };

  //Single
  handlefilterby = (assetFilter: any) => {
    this.filter = assetFilter;
    console.log(this.filter);
    this.isFilterMenuOpen = !this.isFilterMenuOpen;

    const filteredByType =
      assetFilter.assetType.length === 0
        ? this.draftAssets
        : this.draftAssets.filter((asset: any) => {
            return assetFilter.assetType.some(
              (type: any) =>
                type.isSelected && type.type === asset.assetInfo.assetType,
            );
          });

    const filteredBySource =
      assetFilter.assetSource.length === 0
        ? this.draftAssets
        : this.draftAssets.filter((asset: any) => {
            return assetFilter.assetSource.some(
              (source: any) =>
                source.isSelected && asset.assetSource[source.type],
            );
          });

    const filteredByStatus =
      assetFilter.assetStatus.length === 0
        ? this.draftAssets
        : this.draftAssets.filter((asset: any) => {
            return assetFilter.assetStatus.some(
              (status: any) =>
                status.isSelected && asset.assetStatus.status[status.type],
            );
          });

    const filteredAssets: AssetModel[] = this.draftAssets.filter(
      (asset: any) => {
        const passesTypeFilter = filteredByType.includes(asset);
        const passesSourceFilter = filteredBySource.includes(asset);
        const passesStatusFilter = filteredByStatus.includes(asset);

        return (
          passesTypeFilter && passesSourceFilter && passesStatusFilter
          // ||
          // (passesSourceFilter && passesStatusFilter) ||
          // (passesTypeFilter && passesSourceFilter) ||
          // (passesTypeFilter && passesStatusFilter) ||
          // (!passesTypeFilter && !passesStatusFilter && passesSourceFilter) ||
          // (!passesTypeFilter && passesStatusFilter && !passesSourceFilter) ||
          // (passesTypeFilter && !passesStatusFilter && !passesSourceFilter)
        );
      },
    );

    this.filteredByType = filteredByType;
    this.filteredBySource = filteredBySource;
    this.filteredByStatus = filteredByStatus;
    this.draftFilteredAssets = filteredAssets;

    console.log(this.draftFilteredAssets);
  };

  handleAssetId = (event: any) => {
    this.assetId = event;
  };

  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;
  }
}
