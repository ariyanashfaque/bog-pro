import { on } from "@ngrx/store";
import {
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  model,
  OnInit,
  output,
  signal,
  WritableSignal,
} from "@angular/core";
import { MasterAsset } from "src/app/store/models/asset.model";
import { MapSidebarService } from "src/app/services/map-sidebar/map-sidebar.service";
import { DndModule } from "ngx-drag-drop";
import { polyfill } from "mobile-drag-drop";
import { IonIcon, IonText } from "@ionic/angular/standalone";
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
  mapSidebarService = inject(MapSidebarService);

  isDraggable: boolean;
  isMenuOpen = model<boolean>();
  selectedAsset = output<any>();
  activeIndex = model<number>(-1);
  assetData = input<MasterAsset[]>();
  isChildOpen = signal<boolean>(false);
  activeAccordion: string = "recommended";
  selectedMappedAsset = input<MasterAsset>();
  isSubAssetModalOpen = model<boolean>(false);
  draggable = {
    handle: false,
    disable: false,
    data: "myDragData",
    effectAllowed: "all",
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

  constructor() {
    this.mapSidebarService.getIsChildOpen.subscribe((data: boolean) => {
      this.isChildOpen.set(data);
    });
    effect(() => {
      console.log("assetData", this.assetData());
    });
    effect(() => {
      console.log("selectedMappedAsset->", this.selectedMappedAsset());
    });
    effect(() => {
      console.log(
        "this.isChildOpen(): ",
        this.isChildOpen(),
        this.isMenuOpen(),
      );
    });
    // console.log("assetData", this.assetData());
  }

  ngOnInit() {}

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
