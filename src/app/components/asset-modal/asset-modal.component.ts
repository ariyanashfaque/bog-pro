import { Component, model, OnInit, output, signal } from "@angular/core";
import { IonIcon, IonText } from "@ionic/angular/standalone";

@Component({
  selector: "app-asset-modal",
  templateUrl: "./asset-modal.component.html",
  styleUrls: ["./asset-modal.component.scss"],
  standalone: true,
  imports: [IonText, IonIcon],
})
export class AssetModalComponent implements OnInit {
  isMenuOpen = model<boolean>(true);
  isChildOpen = model<boolean>(true);
  activeAccordion: string = "recommended";

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
    this.isMenuOpen.update((isMenuOpen) => !isMenuOpen);
    this.structures.forEach((structure) => {
      structure.child = false;
    });
    this.activeAccordion = "";
  }

  constructor() {}

  ngOnInit() {}

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
