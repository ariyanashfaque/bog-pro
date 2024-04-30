import {
  Input,
  inject,
  OnInit,
  signal,
  Component,
  ViewChild,
  ElementRef,
  WritableSignal,
  model,
  output,
  effect,
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
  AlertController,
  Platform,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { MapService } from "src/app/services/map-service/map.service";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
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
  platform = inject(Platform);
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
  display: any;
  plantId: string;
  assets: AssetModel[];
  store = inject(Store);
  isDragging: boolean = false;
  recievedAssetForDelete: any;
  childAsset = signal<any>({});
  selectedAsset = signal<any>({});
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isChildOpen = signal<boolean>(false);
  subAssetActiveIndex = signal<number>(-1);
  assetModalActiveIndex = signal<number>(-1);
  pressed: WritableSignal<number> = signal(0);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(false);
  dragRecieved: WritableSignal<any> = signal({});
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetModel[] }[];
  assetSentForDelete: any;
  // private pressCounter: WritableSignal<number> = signal(0);
  private pressTimer: ReturnType<typeof setTimeout>;
  private pressCounter: WritableSignal<number> = signal(0);

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

  sendDraggedSubAsset(data: any) {
    this.dragRecieved.set(data);
  }

  deleteSubAsset(data: any) {
    this.recievedAssetForDelete = data;
  }

  constructor(private alertController: AlertController) {
    this.assets = [];
    this.plantId = "";
    this.groupedAssets = [];

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
  }

  async deleteOnDrop(e: DndDropEvent) {
    if (this.recievedAssetForDelete?.subAsset) {
      if (this.recievedAssetForDelete?.subAsset?.assetStatus) {
        const alert = await this.alertController.create({
          header: "Cannot delete asset !!",
          message: "This asset is in registered state",
          buttons: [
            {
              text: "Understood",
              role: "confirm",
              handler: () => {
                console.log("Alert confirmed");
                this.assetSentForDelete = this.recievedAssetForDelete;
              },
            },
          ],
        });

        await alert.present();
      }
    } else {
      // this.assetSentForDelete.emit(this.recievedAssetForDelete);
      // const alert = await this.alertController.create({
      //   header: "Nothing to remove",
      //   message: "Please drag boxes that have assets",
      //   buttons: ["Understood"],
      // });
      // await alert.present();
    }
  }

  ngOnDestroy(): void {
    this.loader.deleteScript();
  }

  public async initializeMap(mapRef: ElementRef) {
    const { Map } = await this.importMapsLibrary("maps");
    this.map = new Map(mapRef.nativeElement, this.mapMptions);
    this.addMapStyles();

    // this.map.addListener("mousemove", (event: google.maps.MapMouseEvent) => {
    //   const position = event?.latLng?.toJSON()!;
    //   if (this.isDragging === true && position) {
    //     this.addMarker(position);
    //     this.isDragging = false;

    //     console.log("primary", position);
    //   }
    // });
  }

  async onDrop(event: DndDropEvent) {
    this.isDragging = true;

    const x = event.event.clientX;
    const y = event.event.clientY;
    const point = new google.maps.Point(x, y);
    const latLng = this.pointToLatLng(point, this.map);

    this.isDragging = false;
    this.addMarker(latLng.toJSON());
  }

  pointToLatLng(point: any, map: any) {
    var topRight = map
      .getProjection()
      .fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map
      .getProjection()
      .fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = new google.maps.Point(
      point.x / scale + bottomLeft.x,
      point.y / scale + topRight.y,
    );
    return map.getProjection().fromPointToLatLng(worldPoint);
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

    // parent.addEventListener("click", () => {
    //   console.log("Parent Bubble");
    // });
    if (this.platform.is("ios") || this.platform.is("android")) {
      mapMarker.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();

          console.log("touch start");
          this.handleLongPress();
        },
        { passive: false },
      );
      mapMarker.addEventListener(
        "touchend",
        (e) => {
          e.preventDefault();

          console.log("touch end");
          console.log(this.pressCounter());

          if (this.pressCounter() === 0) {
            this.toggleInfoMenu();
          }
          if (this.pressCounter() >= 3) {
            this.toggleChildMenu();
          }
        },
        { passive: false },
      );
    } else {
      mapMarker.addEventListener(
        "mousedown",
        (e) => {
          e.preventDefault();
          this.handleLongPress();
          console.log(this.pressCounter());
        },
        { passive: false },
      );
      mapMarker.addEventListener(
        "mouseup",
        (e) => {
          e.preventDefault();
          console.log(this.pressCounter());

          if (this.pressCounter() === 0) {
            this.toggleInfoMenu();
          }
          if (this.pressCounter() >= 3) {
            this.toggleChildMenu();
          }
        },
        { passive: false },
      );
    }

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      gmpClickable: true,
      // gmpDraggable: true,
      content: mapMarker,
    });

    marker.addListener("click", (event: google.maps.MapMouseEvent) => {
      // this.toggleInfoMenu();
      //   this.toggleChildMenu();
    });
  }

  handleLongPress() {
    this.pressTimer = setInterval(() => {
      this.pressCounter.update((counter) => counter + 1);
      if (this.pressCounter() > 5) {
        this.pressCounter.set(0);
        this.handleLongPressRelease();
      }
    }, 1000);
  }

  handleLongPressRelease() {
    clearTimeout(this.pressTimer);
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
  }
}
