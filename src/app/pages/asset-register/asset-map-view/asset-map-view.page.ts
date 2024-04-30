import {
  Input,
  effect,
  inject,
  OnInit,
  signal,
  Component,
  ViewChild,
  ElementRef,
  WritableSignal,
  model,
} from "@angular/core";
import {
  IonFab,
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
  LoadingController,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
  SitesResponseModel,
  MasterAsset,
  MasterAssetResponseModel,
  AssetInfoModel,
} from "src/app/store/models/asset.model";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { MapService } from "src/app/services/map-service/map.service";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { MapViewComponent } from "src/app/components/map-view-component/map-view.component";
import { AssetSidebarComponent } from "src/app/components/asset-sidebar/asset-sidebar.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetModalComponent } from "src/app/components/sub-asset-modal/sub-asset-modal.component";
import { SubAssetSidebarComponent } from "src/app/components/sub-asset-sidebar/sub-asset-sidebar.component";
import { MapSidebarService } from "src/app/services/map-sidebar/map-sidebar.service";

@Component({
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
    AssetSidebarComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    SubAssetModalComponent,
    SubAssetSidebarComponent,
  ],
  standalone: true,
  selector: "app-asset-map-view",
  templateUrl: "./asset-map-view.page.html",
  styleUrls: ["./asset-map-view.page.scss"],
})
export class AssetMapViewPage implements OnInit {
  mapService = inject(MapService);
  mapSidebarService = inject(MapSidebarService);
  loadingCtrl = inject(LoadingController);
  private map: google.maps.Map;
  private mapMptions: google.maps.MapOptions;
  private mapCenter: google.maps.LatLngLiteral;
  private loader = new Loader({
    region: "US",
    language: "en",
    version: "weekly",
    apiKey: environment.browserMapKey,
  });
  @ViewChild("mapRef", { static: true }) mapRef: ElementRef<HTMLDivElement>;
  display: any;
  plantId: string;
  assets: AssetModel[];
  store = inject(Store);
  isDragging: boolean = false;
  childAsset = signal<any>({});
  selectedAsset = signal<any>({});
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isChildOpen = signal<boolean>(false);
  subAssetActiveIndex = signal<number>(-1);
  assetModalActiveIndex = signal<number>(-1);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(false);
  dragRecieved: WritableSignal<any> = signal({});
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  masterAssets: MasterAsset[];
  recievedAssetForDelete: any;
  mappedAssets = signal<AssetModel[]>([]);
  selectedMappedAsset = signal<MasterAsset>({});
  markers: any[] = [];

  @Input()
  set id(plantId: string) {
    this.plantId = plantId;
    this.isLoading.set(true);
    this.GetAllAssets(plantId);
  }

  ngAfterViewInit(): void {
    this.initializeMap(this.mapRef);
  }

  sendDraggedSubAsset(data: any) {
    console.log("dragged: ", data);
    this.dragRecieved.set(data);
  }

  deleteSubAsset(data: any) {
    console.log(data);

    this.recievedAssetForDelete = data;
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

    this.GetAllMasterAsset();
  }

  GetAllMasterAsset = async () => {
    this.isLoading.set(true);
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      spinner: "bubbles",
    });
    loading.present();

    this.httpService.GetAllMasterAsset().subscribe({
      next: (response: MasterAssetResponseModel) => {
        // this.store.dispatch(ADD_PLANTS(response?.data?.sites));
        // this.store.dispatch(ADD_CATEGORIES(response?.data?.categories));
        if (response?.status) {
          console.log("fetched data: ", response);
          this.masterAssets = response?.data;
        }
      },
      error: (error: HttpErrorResponse) => {
        loading.dismiss();
        this.isLoading.set(false);
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        loading.dismiss();
        this.isLoading.set(false);
      },
    });
  };

  GetAllAssets = async (plantId: string) => {
    this.isLoading.set(true);
    const loading = await this.loadingCtrl.create({
      duration: 3000,
      spinner: "bubbles",
    });
    loading.present();

    this.httpService.GetAllAssets({ plantId }).subscribe({
      next: (response: AssetsResponseModel) => {
        this.store.dispatch(
          UPDATE_PLANT({
            assets: response?.data,
          }),
        );
      },
      error: (error: HttpErrorResponse) => {
        loading.dismiss();
        this.isLoading.set(false);
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        loading.dismiss();
        this.isLoading.set(false);
      },
    });
  };

  deleteOnDrop(e: DndDropEvent) {
    if (this.recievedAssetForDelete?.subAsset) {
      if (this.recievedAssetForDelete?.subAsset?.assetStatus?.isDraft) {
        console.log("Draft asset");
      }
    }

    console.log(e.event.dataTransfer?.getData("text/plain"));
  }

  ngOnDestroy(): void {
    this.loader.deleteScript();
  }

  constructor() {
    this.assets = [];
    this.plantId = "";
    this.groupedAssets = [];
    console.log(this.dragRecieved);

    this.mapCenter = { lat: 18.4085962, lng: 77.0994331 };
    this.mapMptions = {
      zoom: 16,
      minZoom: 6,
      maxZoom: 20,
      mapId: "g-maps",
      mapTypeId: "roadmap",
      mapTypeControl: false,
      center: this.mapCenter,
      disableDefaultUI: true,
      streetViewControl: false,
      keyboardShortcuts: false,
      disableDoubleClickZoom: true,
    };
  }

  public async initializeMap(mapRef: ElementRef) {
    const { Map } = await this.importMapsLibrary("maps");
    this.map = new Map(mapRef.nativeElement, this.mapMptions);
    this.addMapStyles();

    this.map.addListener("mousemove", (event: google.maps.MapMouseEvent) => {
      const position = event?.latLng?.toJSON()!;
      if (this.isDragging === true && position) {
        console.log("postion: ", position);

        console.log("this.selectedAsset(): ", this.selectedAsset());

        this.mappedAssets.set([
          ...this.mappedAssets(),
          {
            assetInfo: {
              assetName: this.selectedAsset()?.assetInformation?.title,
              assetType: this.selectedAsset()?.assetInformation?.type,
              assetParentType: this.selectedAsset()?.assetInformation?.type,
              iconPath: this.selectedAsset()?.assetInformation?.icon,
              assetZone: {
                coordinates: position,
              },
            },
          },
        ]);
        const icon = `../assets/${this.selectedAsset()?.assetInformation?.icon ?? "check-in/plant.svg"}`;
        this.addMarker(position, icon, this.mappedAssets());
        this.isDragging = false;
        console.log("mapped: ", this.mappedAssets());
        this.selectedAsset.set({});
      }
    });
  }

  async onDrop(event: DndDropEvent) {
    this.isDragging = true;
  }

  private async addMapStyles() {
    const { StyledMapType } = await this.importMapsLibrary("maps");
    const styledMaps = new StyledMapType(MAPBACKGROUND);
    this.map.mapTypes.set("styled_map", styledMaps);
    this.map.setMapTypeId("styled_map");
  }

  public async addMarker(
    position: google.maps.LatLngLiteral,
    icon: string,
    droppedAsset: any,
  ) {
    const { AdvancedMarkerElement } = await this.importMarkersLibrary("marker");
    let markerData = droppedAsset;

    const markerImage = document.createElement("img");
    markerImage.src = icon;
    markerImage.width = 60;
    markerImage.height = 60;

    const mapMarker = document.createElement("div");
    const counterElement = document.createElement("div");
    counterElement.textContent = "3";
    counterElement.style.top = "-10%";
    counterElement.style.right = "-10%";
    counterElement.style.color = "white";
    counterElement.style.padding = "3px 6px";
    counterElement.style.borderRadius = "50%";
    counterElement.style.position = "absolute";
    counterElement.style.backgroundColor = "red";

    mapMarker.appendChild(markerImage);
    mapMarker.appendChild(counterElement);

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      gmpClickable: true,
      content: mapMarker,
    });

    this.markers.push(marker, ...markerData);

    marker.addListener("click", (event: google.maps.MapMouseEvent) => {
      // console.log(event?.latLng?.toJSON());
      console.log("clicked");
      this.toggleChildMenu();

      if (event?.latLng?.toJSON()) {
        const data = this.findSelectedAsset(
          this.markers,
          event?.latLng?.toJSON(),
        );
        console.log("data: ", data);
        this.selectedMappedAsset.set(data);
      }
    });
  }

  private async importMapsLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  }
  private async importCircleLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  }
  private async importMarkersLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.MarkerLibrary;
  }

  private async importPointLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.CoreLibrary;
  }

  private async importShapeLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
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
    this.mapSidebarService.setIsChildOpen(!this.isChildOpen());
    this.mapSidebarService.setisSubAssetModalOpen(false);
    this.isChildOpen.update((isChildOpen) => !isChildOpen);
    this.isSubAssetModalOpen.update((isSubAssetModalOpen) => false);
  };

  onAssetReceived(asset: any) {
    console.log("onAssetReceived: ", asset);
    if (
      this.selectedAsset() === null ||
      this.selectedAsset()
      // (this.selectedAsset() != asset && asset?.assets?.length > 0) // this condition will be used after sap
    ) {
      this.isSubAssetModalOpen.set(true);
      this.selectedAsset.set(asset);
    } else {
      this.isSubAssetModalOpen.set(false);
      this.selectedAsset.set({});
    }
    console.log("Selected Asset: ", this.selectedAsset());
  }

  findSelectedAsset = (
    assets: AssetModel[],
    area: { lng: number; lat: number },
  ) => {
    const asset = assets?.filter(
      (asset) =>
        asset?.assetInfo?.assetZone?.coordinates.lat === area?.lat &&
        asset.assetInfo?.assetZone?.coordinates.lng === area?.lng,
    )[0];

    return this.masterAssets?.filter(
      (item: MasterAsset) =>
        item?.assetInformation?.type === asset?.assetInfo?.assetParentType,
    )[0];
  };
}
