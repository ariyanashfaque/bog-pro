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
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
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
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { MapViewComponent } from "src/app/components/map-view-component/map-view.component";
import { AssetSidebarComponent } from "src/app/components/asset-sidebar/asset-sidebar.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetModalComponent } from "src/app/components/sub-asset-modal/sub-asset-modal.component";
import { SubAssetSidebarComponent } from "src/app/components/sub-asset-sidebar/sub-asset-sidebar.component";

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
  plantId: string;
  store = inject(Store);
  assets: AssetModel[];
  selectedAsset = signal<any>({});
  isDragging: boolean = false;
  dragRecieved = model<any>({});
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isChildOpen = signal<boolean>(false);
  isAssetInfoMenuOpen = signal<boolean>(true);
  isSubAssetModalOpen = signal<boolean>(false);
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  assetModalActiveIndex = signal<number>(-1);
  childAsset = signal<any>({});
  subAssetActiveIndex = signal<number>(-1);
  display: any;

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

  ngAfterViewInit(): void {
    this.initializeMap(this.mapRef);
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

  ngOnDestroy(): void {
    this.loader.deleteScript();
  }

  constructor() {
    this.assets = [];
    this.plantId = "";
    this.groupedAssets = [];
    effect(() => {
      console.log("subAssetActiveIndex in page: ", this.subAssetActiveIndex());
      console.log("Dragged asset:", this.dragRecieved());
    });

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
      console.log(this.isDragging);
      if (this.isDragging === true && position) {
        console.log(position);
        this.addMarker(position);
        this.isDragging = false;
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

  public async addMarker(position: google.maps.LatLngLiteral) {
    const { AdvancedMarkerElement } = await this.importMarkersLibrary("marker");

    const markerImage = document.createElement("img");
    markerImage.src = "../assets/check-in/plant.svg";
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

    marker.addListener("click", (event: google.maps.MapMouseEvent) => {
      // console.log(event?.latLng?.toJSON());
      this.toggleChildMenu();
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
