import {
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { AssetSidebarComponent } from "src/app/components/asset-sidebar/asset-sidebar.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetSidebarComponent } from "src/app/components/sub-asset-sidebar/sub-asset-sidebar.component";
import { SubAssetModalComponent } from "src/app/components/sub-asset-modal/sub-asset-modal.component";
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
  IonFab,
} from "@ionic/angular/standalone";
import {
  AssetModel,
  SiteModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
@Component({
  selector: "app-asset-map-view",
  templateUrl: "./asset-map-view.page.html",
  styleUrls: ["./asset-map-view.page.scss"],
  standalone: true,
  imports: [
    IonFab,
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
    MapViewComponent,
    AssetSidebarComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    SubAssetSidebarComponent,
    SubAssetModalComponent,
  ],
})
export class AssetMapViewPage implements OnInit {
  plantId: string;
  store = inject(Store);
  assets: AssetModel[];
  selectedAsset = signal<any>({});
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isChildOpen = signal<boolean>(false);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(false);
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  assetModalActiveIndex = signal<number>(-1);
  childAsset = signal<any>({});
  subAssetActiveIndex = signal<number>(-1);

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
              assets: this.assets.filter(
                (asset) => asset?.assetInfo?.assetParentType === parentType,
              ),
            });
          });
        }
      },
    });

    console.log("Assets:", this.assets);
    console.log("Grouped Assets:", this.groupedAssets);
  }

  constructor() {
    this.assets = [];
    this.plantId = "";
    this.groupedAssets = [];
    effect(() => {
      console.log("subAssetActiveIndex in page: ", this.subAssetActiveIndex());
    });
  }

  closeSubAssetModal() {
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
    this.assetModalActiveIndex.update(() => -1);
  }

  toggleInfoMenu() {
    this.isAssetInfoMenuOpen.update(
      (isAssetInfoMenuOpen) => !isAssetInfoMenuOpen,
    );
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
    this.assetModalActiveIndex.update(() => -1);
    this.subAssetActiveIndex.update(() => -1);
  }

  toggleChildMenu = () => {
    this.isChildOpen.update((isChildOpen) => !isChildOpen);
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
  };

  onAssetReceived(asset: any) {
    if (
      this.selectedAsset() === null ||
      (this.selectedAsset() != asset && asset.assets.length > 0)
    ) {
      this.isSubAssetModalOpen.set(true);
      this.selectedAsset.set(asset);
    } else {
      this.isSubAssetModalOpen.set(false);
      this.selectedAsset.set({});
    }
    console.log("Selected Asset: ", this.selectedAsset());
  }
}
