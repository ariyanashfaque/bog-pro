import {
  Component,
  computed,
  effect,
  EventEmitter,
  Injector,
  Input,
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
  draggedAssets = computed(() => this.recievedDraggedAsset());
  // @Input() recievedDraggedAsset = new EventEmitter<string>();

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

  constructor(private injector: Injector) {
    effect(() => {
      console.log("Active indexxxxx: ", this.activeIndex());
      console.log("Recieved dragged asset:", this.recievedDraggedAsset());
    });
  }

  ngOnInit() {}

  onDrop(event: DndDropEvent, i: number) {
    // console.log(this.recievedDraggedAsset());
    console.log(this.draggedAssets());

    this.imageUrl = event.event.dataTransfer?.getData("text/plain");
    // Find the index of the subAsset with the matching assetIndex
    const index = this.subAssets.findIndex((item) => item.assetIndex === i);
    if (index !== -1) {
      // If an object with the same assetIndex exists, update it
      this.subAssets[index] = {
        subAsset: this.recievedDraggedAsset,
        assetImage: this.imageUrl,
        assetIndex: i,
      };
    } else {
      // If not found, insert a new object at the specified index
      this.subAssets.splice(i, 0, {
        subAsset: this.recievedDraggedAsset,
        assetImage: this.imageUrl,
        assetIndex: i,
      });
    }
    console.log(this.subAssets);
  }
}
