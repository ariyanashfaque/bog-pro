import { ElementRef, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { MAPBACKGROUND } from "src/app/utils/constant.util";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class MapService {
  private map: google.maps.Map;
  private mapMptions: google.maps.MapOptions;
  private mapCenter: google.maps.LatLngLiteral;
  private mapMarker: google.maps.marker.AdvancedMarkerElement;
  private rectangles: google.maps.Rectangle[] = [];
  public isDragging = new BehaviorSubject<boolean>(false);

  private loader = new Loader({
    region: "US",
    language: "en",
    version: "weekly",
    apiKey: environment.browserMapKey,
  });

  constructor() {
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

    this.map.addListener("click", (event: google.maps.MapMouseEvent) => {
      const position = event?.latLng?.toJSON()!;
      this.addMarker(position);
    });

    this.addRectangleZone();
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
      console.log(event?.latLng?.toJSON());
    });
  }

  public calculateBounds(x: number, y: number) {
    const point = new google.maps.Point(x, y);
    const coords = this.map.getProjection()?.fromPointToLatLng(point)?.toJSON();

    if (coords) {
      console.log("Dhukse");

      this.addMarker(coords);
    }

    return coords;
  }

  public async addRectangleZone() {
    const { Rectangle } = await this.importShapeLibrary("maps");

    const rectangleCoordinates = [
      { north: 18.4088, south: 18.4084, east: 77.0995, west: 77.0993 }, // Adjusted east value to create a gap
      { north: 18.4092, south: 18.4088, east: 77.1, west: 77.0996 },
    ];

    const rectangleOptions: google.maps.RectangleOptions = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      clickable: true,
    };

    rectangleCoordinates.forEach((coords) => {
      const rectangle = new Rectangle({
        bounds: coords,
        map: this.map,
        ...rectangleOptions,
      });
      this.rectangles.push(rectangle);

      rectangle.addListener("click", () => {
        const centerLat = (coords.north + coords.south) / 2;
        const centerLng = (coords.east + coords.west) / 2;
        const center = { lat: centerLat, lng: centerLng };

        // Zoom in to the clicked rectangle
        this.map.setCenter(center);
        this.map.setZoom(20); // Adjust the zoom level as needed
      });

      rectangle.addListener("dblclick", () => {
        this.map.setZoom(16);
      });
    });
  }

  public addDropedAsset() {
    this.map.addListener("mousemove", (event: google.maps.MapMouseEvent) => {
      if (event.latLng != null) {
        this.isDragging.subscribe((value) => {
          if ((value = true)) {
            const position = event?.latLng?.toJSON()!;
            this.addMarker(position);
          }
        });
      }
    });
  }

  private async addMapStyles() {
    const { StyledMapType } = await this.importMapsLibrary("maps");
    const styledMaps = new StyledMapType(MAPBACKGROUND);
    this.map.mapTypes.set("styled_map", styledMaps);
    this.map.setMapTypeId("styled_map");
  }

  public destroyMap() {
    this.loader.deleteScript();
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

  private async importShapeLibrary(type: Library) {
    return (await this.loader.importLibrary(type)) as google.maps.MapsLibrary;
  }
}
