import {
  Input,
  input,
  model,
  effect,
  OnInit,
  computed,
  Injector,
  Component,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
import { RoundProgressComponent } from "angular-svg-round-progressbar";

@Component({
  standalone: true,
  selector: "app-sub-asset-modal",
  imports: [RoundProgressComponent, DndModule],
  templateUrl: "./sub-asset-modal.component.html",
  styleUrls: ["./sub-asset-modal.component.scss"],
})
export class SubAssetModalComponent implements OnInit, OnChanges {
  childAsset = model<any>({});
  activeIndex = model<number>(-1);
  isAssetInfoMenuOpen = model(false);
  recievedDraggedAsset = input.required<any>();

  recievedAssetFromSidebar: any;
  subAssets: any[] = [
    {
      assetIndex: 0,
    },
    {
      assetIndex: 1,
    },
    {
      assetIndex: 2,
    },
    {
      assetIndex: 3,
    },
    {
      assetIndex: 4,
    },
    {
      assetIndex: 5,
    },
    {
      assetIndex: 6,
    },
  ];
  imageUrl: any;
  _recievedDraggedAsset: any;

  onAssetClick(asset: any, index: number) {
    this.isAssetInfoMenuOpen.update((isAssetInfoMenuOpen) => true);
    this.activeIndex.update(() => index);
    this.childAsset.update(() => this.subAssets[this.activeIndex()]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["activeIndex"] && this.activeIndex() !== -1) {
      this.childAsset.update(() => this.subAssets[this.activeIndex()]);
    }

    if (changes["recievedDraggedAsset"]) {
      this._recievedDraggedAsset = changes["recievedDraggedAsset"].currentValue;
    }

    console.log(this._recievedDraggedAsset);
  }

  constructor(private injector: Injector) {
    effect(() => {
      // console.log("Received Dragged Asset: ", this.draggedAsset());
    });
  }

  ngOnInit() {}

  onDrop(event: DndDropEvent, i: number) {
    this.imageUrl = event.event.dataTransfer?.getData("text/plain");
    // Find the index of the subAsset with the matching assetIndex
    const index = this.subAssets.findIndex((item) => item.assetIndex === i);
    if (index !== -1) {
      // If an object with the same assetIndex exists, update it
      this.subAssets[index] = {
        subAsset: this._recievedDraggedAsset,
        assetImage: this.imageUrl,
        assetIndex: i,
      };
    } else {
      // If not found, insert a new object at the specified index
      this.subAssets.splice(i, 0, {
        subAsset: this._recievedDraggedAsset,
        assetImage: this.imageUrl,
        assetIndex: i,
      });
    }
    console.log(this.subAssets);
  }
}
