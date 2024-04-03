import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
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
} from "@ionic/angular/standalone";
import {
  AssetsModel,
  PlantsModel,
  AssetsResponse,
} from "src/app/store/models/plant.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/plant.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { AssetMappedCardComponent } from "src/app/components/asset-mapped-card/asset-mapped-card.component";
import { ApprovalAssetMappedCardComponent } from "../../../components/approval-asset-mapped-card/approval-asset-mapped-card.component";
import { AssetApprovalUpdateModalComponent } from "../../../components/approval-asset-mapped-card/asset-approval-update-modal/asset-approval-update-modal.component";

@Component({
    selector: 'app-approval-asset-mapped',
    templateUrl: './approval-asset-mapped.page.html',
    styleUrls: ['./approval-asset-mapped.page.scss'],
    standalone: true,
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
        ApprovalAssetMappedCardComponent,
        AssetApprovalUpdateModalComponent
    ]
})
export class ApprovalAssetMappedPage implements OnInit {

  plantId: string;
  store = inject(Store);
  assets: AssetsModel[];
  assetss: AssetsModel[];
  toggleChecked: boolean;
  draftAssets: AssetsModel[];
  isApprovalMenuOpen: boolean = false;
  registeredAssets: AssetsModel[];
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetsModel[] }[];
  dreaftGroupAssets: { assetParentType?: string; assets?: AssetsModel[] }[];
  registerGroupAssets: { assetParentType?: string; assets?: AssetsModel[] }[];

  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
    this.isLoading.set(true);
    this.httpService.GetAllAssets({ plantId }).subscribe({
      next: (response: AssetsResponse) => {
        this.store.dispatch(
          UPDATE_PLANT({
            assets: response?.data,
          })
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
    this.isApprovalMenuOpen = false;
    this.groupedAssets = [];
    this.registeredAssets = [];
    this.dreaftGroupAssets = [];
    this.registerGroupAssets = [];
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;

          this.registeredAssets = plant.assets.filter(
            (asset) => asset?.assetRegisteredStatus?.assetRegistered
          );
          this.draftAssets = plant.assets.filter(
            (asset) => !asset?.assetRegisteredStatus?.assetRegistered
          );
          this.assetss = this.registeredAssets;

          const parentTypes = new Set(
            this.assets.map((asset) => asset?.assetInfo?.assetParentType)
          );

          this.groupedAssets = [];
          parentTypes.forEach((parentType) => {
            this.groupedAssets.push({
              assetParentType: parentType,
              assets: this.registeredAssets.filter(
                (asset) => asset?.assetInfo?.assetParentType === parentType
              ),
            });
          });
        }
      },
    });

    console.log(this.assets);
  }

  handleErrorModal = (event: any) => {
    this.isApprovalMenuOpen = event;
  };
  handleToggle(event: any) {
    this.toggleChecked = event.detail.checked;

    // const parentTypes = new Set(
    //   this.assets.map((asset) => asset?.assetInfo?.assetParentType),
    // );
    // this.groupedAssets = [];

    if (this.toggleChecked) {
      this.assetss = this.draftAssets;
    } else {
      this.assetss = this.registeredAssets;
    }

    // if (this.toggleChecked) {
    //   parentTypes.forEach((parentType) => {
    //     this.groupedAssets.push({
    //       assetParentType: parentType,
    //       assets: this.draftAssets.filter(
    //         (asset) => asset?.assetInfo?.assetParentType === parentType,
    //       ),
    //     });
    //   });
    // } else {
    //   parentTypes.forEach((parentType) => {
    //     this.groupedAssets.push({
    //       assetParentType: parentType,
    //       assets: this.registeredAssets.filter(
    //         (asset) => asset?.assetInfo?.assetParentType === parentType,
    //       ),
    //     });
    //   });
    // }

    console.log(this.assets);
  }
}
