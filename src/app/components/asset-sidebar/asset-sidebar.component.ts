import { on } from "@ngrx/store";
import {
  Component,
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
import { IonIcon, IonText } from "@ionic/angular/standalone";
import { DndModule } from "ngx-drag-drop";
import { MasterAsset } from "src/app/store/models/asset.model";

@Component({
  selector: "app-asset-sidebar",
  templateUrl: "./asset-sidebar.component.html",
  styleUrls: ["./asset-sidebar.component.scss"],
  standalone: true,
  imports: [IonText, IonIcon, DndModule],
})
export class AssetSidebarComponent implements OnInit {
  isMenuOpen = model<boolean>();
  isChildOpen = model<boolean>();
  isSubAssetModalOpen = model<boolean>(false);
  activeAccordion: string = "recommended";
  assetData = input<MasterAsset[]>();
  selectedAsset = output<any>();
  activeIndex = model<number>(-1);

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
    console.log("Index: ", this.activeIndex());
  }

  onDragStart(event: MouseEvent, asset: any) {
    console.log(asset);
    this.selectedAsset.emit(asset);
    event.stopPropagation();
  }

  constructor() {
    effect(() => {
      console.log("assetData", this.assetData);
    });

    console.log("assetData", this.assetData);
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
}
