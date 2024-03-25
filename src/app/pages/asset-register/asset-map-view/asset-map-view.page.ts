import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ChildAssetModalComponent } from "src/app/components/child-asset-modal/child-asset-modal.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";

import {
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonText,
  IonModal,
  IonBackdrop,
  IonProgressBar,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-asset-map-view",
  templateUrl: "./asset-map-view.page.html",
  styleUrls: ["./asset-map-view.page.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonIcon,
    IonModal,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackdrop,
    IonProgressBar,
    HeaderComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    ChildAssetModalComponent,
  ],
})
export class AssetMapViewPage implements OnInit {
  constructor() {}
  ngOnInit() {}

  isMenuOpen = true;
  isChildOpen = false;
  isAssetInfoMenuOpen = false;
  activeAccordion: string = "recommended";

  toggleInfoMenu() {
    this.isAssetInfoMenuOpen = !this.isAssetInfoMenuOpen;
  }

  toggleVisibility(buttonId: string) {
    if (this.activeAccordion === buttonId) {
      this.activeAccordion = "";
    } else {
      this.activeAccordion = buttonId;
    }
    this.structures.forEach((structure) => {
      structure.child = false;
    });
  }

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    this.structures.forEach((structure) => {
      structure.child = false;
    });
    this.activeAccordion = "";
  }

  toggleChildMenu = () => {
    this.isChildOpen = !this.isChildOpen;
  };

  structures = [
    {
      assetId: "1",
      child: false,
    },
    {
      assetId: "2",
      child: false,
    },
    {
      assetId: "3",
      child: false,
    },
    {
      assetId: "4",
      child: false,
    },
    {
      assetId: "5",
      child: false,
    },
    {
      assetId: "6",
      child: false,
    },
    {
      assetId: "7",
      child: false,
    },
    {
      assetId: "8",
      child: false,
    },
    {
      assetId: "9",
      child: false,
    },
  ];
}
