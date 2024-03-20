import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.page.html",
  styleUrls: ["./map-view.page.scss"],
  standalone: true,
  imports: [IonContent, HeaderComponent],
})
export class MapViewPage implements OnInit {
  constructor() {}
  ngOnInit() {}
}
