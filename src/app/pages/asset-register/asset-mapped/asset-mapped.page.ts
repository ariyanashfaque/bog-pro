import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
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
import { AssetApprovalUpdateModalComponent } from "src/app/components/asset-approval-update-modal/asset-approval-update-modal.component";

@Component({
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
    AssetApprovalUpdateModalComponent,
  ],
  standalone: true,
  selector: "app-asset-mapped",
  templateUrl: "./asset-mapped.page.html",
  styleUrls: ["./asset-mapped.page.scss"],
})
export class AssetMappedPage implements OnInit {
  store = inject(Store);
  httpService = inject(HttpService);
  toastService = inject(ToastService);

  plantId: string;
  assets: AssetModel[];
  assetss: AssetModel[];
  toggleChecked: boolean;
  draftAssets: AssetModel[];
  registeredAssets: AssetModel[];
  isApprovalMenuOpen: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  dreaftGroupAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  registerGroupAssets: { assetParentType?: string; assets?: AssetModel[] }[];

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
    this.assetss = [];
    this.plantId = "";
    this.draftAssets = [];
    this.groupedAssets = [];
    this.registeredAssets = [];
    this.dreaftGroupAssets = [];
    this.registerGroupAssets = [];
    this.isApprovalMenuOpen = false;
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: SiteModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;

          // this.registeredAssets = plant.assets.filter(
          //   (asset) => asset?.assetRegisteredStatus?.assetRegistered
          // );
          // this.draftAssets = plant.assets.filter(
          //   (asset) => !asset?.assetRegisteredStatus?.assetRegistered
          // );
          // this.assetss = this.registeredAssets;

          // const parentTypes = new Set(
          //   this.assets.map((asset) => asset?.assetInfo?.assetParentType)
          // );

          // this.groupedAssets = [];
          // parentTypes.forEach((parentType) => {
          //   this.groupedAssets.push({
          //     assetParentType: parentType,
          //     assets: this.registeredAssets.filter(
          //       (asset) => asset?.assetInfo?.assetParentType === parentType
          //     ),
          //   });
          // });
        }
      },
    });
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };
  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;

    if (this.toggleChecked) {
      this.assetss = this.draftAssets;
    } else {
      this.assetss = this.registeredAssets;
    }
  }
}
