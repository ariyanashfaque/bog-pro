import { ElementRef, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { MAPBACKGROUND } from "src/app/utils/constant.util";

@Injectable({ providedIn: "root" })
export class MapService {
  private map: google.maps.Map;
  private mapMptions: google.maps.MapOptions;
  private mapCenter: google.maps.LatLngLiteral;
  private mapMarker: google.maps.marker.AdvancedMarkerElement;

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
  }

  public async addMarker(position: google.maps.LatLngLiteral) {
    const { AdvancedMarkerElement } = await this.importMarkersLibrary("marker");

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position: position,
      gmpClickable: true,
    });

    marker.addListener("click", (event: google.maps.MapMouseEvent) => {
      console.log(event?.latLng?.toJSON());
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
}
