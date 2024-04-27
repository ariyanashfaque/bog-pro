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
  output,
} from "@angular/core";
import { DndDropEvent, DndModule } from "ngx-drag-drop";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { DndEvent } from "ngx-drag-drop/lib/dnd-utils";

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
  sendForDeleteAsset = output<any>();
  confirmDeleteAsset = input<any>();

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
    console.log(asset);

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
  }

  constructor(private injector: Injector) {
    effect(() => {
      this.deleteDropzoneBox(this.confirmDeleteAsset());
      // console.log("Confirm delete: ", this.confirmDeleteAsset());
    });
  }

  ngOnInit() {}

  onDragStart(event: DndEvent, subAsset: any) {
    console.log("Sending to delete:", subAsset);
    this.sendForDeleteAsset.emit(subAsset);
  }

  onDrop(event: DndDropEvent, i: number) {
    this.imageUrl = event.event.dataTransfer?.getData("text/plain");
    const allIndexesExceptLastFilled = this.subAssets
      .slice(0, -1)
      .every((item) => !!item.subAsset);

    if (allIndexesExceptLastFilled) {
      const nextIndex = this.subAssets.length;
      this.subAssets.push({
        assetIndex: nextIndex,
      });
    }
    const nextIndex = this.subAssets.findIndex((item) => !item.subAsset);
    this.subAssets[nextIndex] = {
      subAsset: this._recievedDraggedAsset,
      assetImage: this.imageUrl,
      assetIndex: nextIndex,
    };
    console.log(this.subAssets);
  }

  deleteDropzoneBox(data: any) {
    console.log("Got data:", data);

    // Find the index of the item in subAssets array that matches the received data
    const indexToDelete = this.subAssets.findIndex(
      (item) => item.assetIndex === data.assetIndex,
    );

    // If the item exists in the array, remove its content while keeping the assetIndex intact
    if (indexToDelete !== -1) {
      // Clear the content of the object at the index
      this.subAssets[indexToDelete] = { assetIndex: data.assetIndex };
    }

    console.log("Updated array:", this.subAssets);
  }
}
