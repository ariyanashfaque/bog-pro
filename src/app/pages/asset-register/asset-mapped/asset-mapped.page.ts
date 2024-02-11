import { Component, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  standalone: true,
  selector: "app-asset-mapped",
  templateUrl: "./asset-mapped.page.html",
  styleUrls: ["./asset-mapped.page.scss"],
  imports: [IonContent, HeaderComponent],
})
export class AssetMappedPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
