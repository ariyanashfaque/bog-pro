import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import {
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonText,
  IonModal,
  IonBackdrop,
} from "@ionic/angular/standalone";
@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.page.html",
  styleUrls: ["./map-view.page.scss"],
  standalone: true,
  imports: [
    IonBackdrop,
    IonModal,
    IonText,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    IonTitle,
    HeaderComponent,
  ],
})
export class MapViewPage implements OnInit {
  constructor() {}
  ngOnInit() {}

  isMenuOpen = true;
  activeAccordion: string = "recommended";

  toggleVisibility(buttonId: string) {
    if (this.activeAccordion === buttonId) {
      // If the same button is clicked again, hide the div
      this.activeAccordion = "";
    } else {
      // If a different button is clicked, show its corresponding div
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

  isChildOpen = false;
  toggleChildMenu = () => {
    this.isChildOpen = !this.isChildOpen;
  };
}
