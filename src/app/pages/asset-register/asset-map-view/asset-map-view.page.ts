import {
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ChildAssetModalComponent } from "src/app/components/child-asset-modal/child-asset-modal.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetModalComponent } from "src/app/components/sub-assets-modal/sub-asset-modal.component";
import { AssetModalComponent } from "src/app/components/asset-modal/asset-modal.component";
import { MapViewComponent } from "src/app/components/map-view-component/map-view.component";

import {
  IonIcon,
  IonText,
  IonTitle,
  IonModal,
  IonHeader,
  IonButton,
  IonContent,
  IonToolbar,
  IonBackdrop,
  IonProgressBar,
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
import { HttpService } from "src/app/services/http-service/http-client.service";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";

@Component({
  selector: "app-asset-map-view",
  templateUrl: "./asset-map-view.page.html",
  styleUrls: ["./asset-map-view.page.scss"],
  standalone: true,
  imports: [
    IonText,
    IonIcon,
    IonModal,
    IonTitle,
    IonButton,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackdrop,
    IonProgressBar,
    HeaderComponent,
    AssetModalComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    SubAssetModalComponent,
    ChildAssetModalComponent,
    MapViewComponent,
  ],
})
export class AssetMapViewPage implements OnInit {
  plantId: string;
  store = inject(Store);
  assets: AssetsModel[];
  // toggleChecked: boolean;
  draftAssets: AssetsModel[];
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

    console.log("Assets:", this.assets);
    console.log("Registered Assets:", this.registeredAssets);
    console.log("Draft Assets:", this.draftAssets);
    console.log("Grouped Assets:", this.groupedAssets);
  }

  isChildOpen = signal<boolean>(false);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(false);
  selectedAsset = signal<any>({});

  constructor() {
    effect(() => {
      console.log("isMenuOpen changed to: ", this.isSubAssetModalOpen());
    });

    this.assets = [];
    this.plantId = "";
    this.draftAssets = [];
    this.groupedAssets = [];
    this.registeredAssets = [];
    this.dreaftGroupAssets = [];
    this.registerGroupAssets = [];
  }

  toggleInfoMenu() {
    this.isAssetInfoMenuOpen.update(
      (isAssetInfoMenuOpen) => !isAssetInfoMenuOpen
    );
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
  }

  toggleChildMenu = () => {
    this.isChildOpen.update((isChildOpen) => !isChildOpen);
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
  };

  onAssetReceived(asset: any) {
    this.selectedAsset.set(asset);
    console.log("Selected Asset: ", this.selectedAsset());
    if (this.selectedAsset().assets.length > 0) {
      this.isSubAssetModalOpen.set(true);
    }
  }
}
