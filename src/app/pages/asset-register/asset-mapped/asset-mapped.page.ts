import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
  Output,
  EventEmitter,
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
  IonContent,
  IonToolbar,
  IonSegment,
  IonBackdrop,
  IonCardTitle,
  IonAccordion,
  IonCardHeader,
  IonSegmentButton,
  IonAccordionGroup,
  IonButton,
} from "@ionic/angular/standalone";
import {
  AssetModel,
  SiteModel,
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
    IonButton,
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonItem,
    IonCard,
    IonGrid,
    IonTitle,
    IonLabel,
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
  isFilterMenuOpen: boolean = false;
  assetId: string;
  plantId: string;
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  filterasset: AssetModel[];
  assetType: String = "";
  getassetTypes: any[];
  tempassets: any;

  registeredAssets: AssetModel[];
  isApprovalMenuOpen: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);
  assets: AssetModel[];
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];

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
    this.plantId = "";
    this.assetId = "";
    this.draftAssets = [];
    this.assetType = "";
    this.getassetTypes = [];
    this.tempassets = {};

    this.toggleChecked = true;
    this.registeredAssets = [];
    this.isApprovalMenuOpen = false;
    this.assets = [];
    this.groupedAssets = [];
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;
          const parentTypes = new Set(
            this.assets.map((asset) => asset?.assetInfo?.assetParentType),
          );

          this.groupedAssets = [];
          parentTypes.forEach((parentType) => {
            this.groupedAssets.push({
              assetParentType: parentType,
              assets: this.draftAssets.filter(
                (asset) => asset?.assetInfo?.assetParentType === parentType,
              ),
            });
          });

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

    // console.log("draft:", this.draftAssets);
    // console.log("registered:", this.registeredAssets);
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };

  handleFilterModal = (event: any) => {
    this.isFilterMenuOpen = event;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  };

  handlefilterby = (event: any) => {
    this.getassetTypes = event;
    this.isFilterMenuOpen = false;

    this.getassetTypes.forEach((type: String) => {
      this.tempassets = this.draftAssets.filter(
        (asset) => asset?.assetInfo?.assetParentType === type,
      );
    });

    this.draftAssets = this.tempassets;
    console.log(this.getassetTypes);
    console.log(this.draftAssets);
    console.log(this.tempassets);
  };

  handleAssetId = (event: any) => {
    this.assetId = event;
  };

  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;
  }
}
