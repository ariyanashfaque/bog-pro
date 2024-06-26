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
  filterCounts: number;
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  filteredAssets: AssetModel[];
  registeredAssets: AssetModel[];
  filterAbleAssets: AssetModel[];
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
    this.filterCounts = 0;
    this.filteredAssets = [];
    this.toggleChecked = true;
    this.registeredAssets = [];
    this.filterAbleAssets = [];
    this.draftFilteredAssets = [];
    this.isApprovalMenuOpen = false;
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;
          console.log(this.assets);

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

    if (this.toggleChecked) {
      this.filterAbleAssets = this.draftAssets;
      this.draftFilteredAssets = this.draftAssets;
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

    // draft aseets
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

    this.draftFilteredAssets = this.filteredAssets;
  };

  handleAssetId = (event: any) => {
    this.assetId = event;
  };

  handleToggle(event: any) {
    this.filterCounts = 0;
    this.filter = {
      assetType: [],
      assetArea: [],
      assetSource: [],
      assetStatus: [],
    };

    if (event.detail.checked) {
      this.filterAbleAssets = this.draftAssets;
      this.draftFilteredAssets = this.draftAssets;
    } else {
      this.filterAbleAssets = this.registeredAssets;
      this.draftFilteredAssets = this.registeredAssets;
    }
    this.toggleChecked = event.detail.checked;
  }
}
