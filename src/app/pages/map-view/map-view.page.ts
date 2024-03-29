import { Component, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/header/header.component";
import { MapViewComponent } from "src/app/components/map-view-component/map-view.component";

@Component({
  standalone: true,
  selector: "app-map-view",
  templateUrl: "./map-view.page.html",
  styleUrls: ["./map-view.page.scss"],
  imports: [IonContent, HeaderComponent, MapViewComponent],
})
export class MapViewPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
