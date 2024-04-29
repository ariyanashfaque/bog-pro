import { DndModule } from "ngx-drag-drop";
import { polyfill } from "mobile-drag-drop";
import { IonIcon, IonText } from "@ionic/angular/standalone";
import { AssetModel } from "src/app/store/models/asset.model";
import { Component, input, model, OnInit, output } from "@angular/core";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";

polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

@Component({
  standalone: true,
  selector: "app-asset-sidebar",
  imports: [IonText, IonIcon, DndModule],
  templateUrl: "./asset-sidebar.component.html",
  styleUrls: ["./asset-sidebar.component.scss"],
})
export class AssetSidebarComponent implements OnInit {
  isDraggable: boolean;
  assetData = input<any[]>();
  isMenuOpen = model<boolean>();
  selectedAsset = output<any>();
  isChildOpen = model<boolean>();
  activeIndex = model<number>(-1);
  activeAccordion: string = "recommended";
  isSubAssetModalOpen = model<boolean>(false);

  draggable = {
    handle: false,
    disable: false,
    data: "myDragData",
    effectAllowed: "all",
  };

  constructor() {
    this.isDraggable = false;
  }

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
    this.activeIndex.update(() => -1);
  }

  onAssetClick(asset: any, index: number) {
    this.selectedAsset.emit(asset);
    if (this.activeIndex() === index) {
      this.activeIndex.update(() => -1);
    } else {
      this.activeIndex.update(() => index);
    }
  }

  onDragStart(event: MouseEvent, asset: any) {
    event.stopPropagation();

    this.selectedAsset.emit(asset);
  }
}
