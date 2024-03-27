import {
  OnInit,
  inject,
  Component,
  viewChild,
  OnDestroy,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { MapService } from "src/app/services/map-service/map.service";

@Component({
  standalone: true,
  selector: "map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.scss"],
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {
  mapService = inject(MapService);
  mapRef = viewChild.required<ElementRef<HTMLDivElement>>("mapRef");

  constructor() {}

  ngAfterViewInit(): void {
    this.mapService.initializeMap(this.mapRef());
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mapService.destroyMap();
  }
}
