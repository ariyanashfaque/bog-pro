import {
  Component,
  effect,
  input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { DndDropEvent, DndModule } from "ngx-drag-drop";

@Component({
  selector: "app-sub-asset-modal",
  standalone: true,
  templateUrl: "./sub-asset-modal.component.html",
  styleUrls: ["./sub-asset-modal.component.scss"],
  imports: [RoundProgressComponent, DndModule],
})
export class SubAssetModalComponent implements OnInit, OnChanges {
  isAssetInfoMenuOpen = model(false);
  childAsset = model<any>({});
  activeIndex = model<number>(-1);
  recievedDraggedAsset = model<any>({});
  imageUrl: any[] = [];

  onAssetClick(asset: any, index: number) {
    this.isAssetInfoMenuOpen.update((isAssetInfoMenuOpen) => true);
    this.activeIndex.update(() => index);
    this.childAsset.update(() => this.subAssets[this.activeIndex()]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["activeIndex"] && this.activeIndex() !== -1) {
      this.childAsset.update(() => this.subAssets[this.activeIndex()]);
    }
  }

  constructor() {
    effect(() => {
      console.log("Active indexxxxx: ", this.activeIndex());
      console.log("Recieved dragged asset:", this.recievedDraggedAsset());
    });
  }

  ngOnInit() {}

  onDrop(event: DndDropEvent, i: number) {
    this.imageUrl[i] = event.event.dataTransfer?.getData("text/plain");
    console.log(i);
  }

  subAssets = [
    {
      name: "Sub Asset 1",
    },
    {
      name: "Sub Asset 2",
    },
    {
      name: "Sub Asset 3",
    },
    {
      name: "Sub Asset 4",
    },
    {
      name: "Sub Asset 5",
    },
    {
      name: "Sub Asset 6",
    },
    {
      name: "Sub Asset 7",
    },
  ];
}
