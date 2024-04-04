import {
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/plant.action";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { AssetModalComponent } from "src/app/components/asset-modal/asset-modal.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetModalComponent } from "src/app/components/sub-assets-modal/sub-asset-modal.component";
import { ChildAssetModalComponent } from "src/app/components/child-asset-modal/child-asset-modal.component";
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
  AssetsModel,
  PlantsModel,
  AssetsResponse,
} from "src/app/store/models/plant.model";
import { MapService } from "src/app/services/map-service/map.service";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
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
    DndModule,
    IonToolbar,
    IonContent,
    IonBackdrop,
    IonProgressBar,
    HeaderComponent,
    MapViewComponent,
    AssetModalComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    SubAssetModalComponent,
    ChildAssetModalComponent,
  ],
})
export class AssetMapViewPage implements OnInit {
  mapService = inject(MapService);
  // mapRef = viewChild.required<ElementRef<HTMLDivElement>>("mapRef");
  @ViewChild("mapRef", { static: true }) mapRef: ElementRef<HTMLDivElement>;
  plantId: string;
  store = inject(Store);
  assets: AssetsModel[];
  selectedAsset = signal<any>({});
  isDragging: boolean = false;
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isChildOpen = signal<boolean>(false);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(false);
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetsModel[] }[];
  assetModalActiveIndex = signal<number>(-1);

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

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapRef);
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant?.assets) {
          this.assets = plant.assets;

          const parentTypes = new Set(
            this.assets.map((asset) => asset?.assetInfo?.assetParentType)
          );

          this.groupedAssets = [];
          parentTypes.forEach((parentType) => {
            this.groupedAssets.push({
              assetParentType: parentType,
              assets: this.assets.filter(
                (asset) => asset?.assetInfo?.assetParentType === parentType
              ),
            });
          });
        }
      },
    });

    console.log("Assets:", this.assets);
    console.log("Grouped Assets:", this.groupedAssets);
  }

  onDrop(event: DndDropEvent) {
    this.mapService.isDragging.next(true);
    this.mapService.addDropedAsset();

    // const bounds = this.mapRef.nativeElement.getBoundingClientRect();
    // const mouseX = event.event.clientX - bounds.left;
    // const mouseY = event.event.clientY - bounds.top;

    // const points = this.mapService.calculateBounds(mouseX, mouseY);
    // console.log(points);
  }

  // movedMouse(event: MouseEvent){
  // this.mapService.isDragging.next(true);

  // }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }

  constructor() {
    this.assets = [];
    this.plantId = "";
    this.groupedAssets = [];
  }

  closeSubAssetModal() {
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
    this.assetModalActiveIndex.update(() => -1);
  }

  toggleInfoMenu() {
    this.isAssetInfoMenuOpen.update(
      (isAssetInfoMenuOpen) => !isAssetInfoMenuOpen
    );
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
    this.assetModalActiveIndex.update(() => -1);
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
