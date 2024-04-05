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

@Component({
  selector: "app-child-asset-modal",
  standalone: true,
  templateUrl: "./child-asset-modal.component.html",
  styleUrls: ["./child-asset-modal.component.scss"],
  imports: [RoundProgressComponent],
})
export class ChildAssetModalComponent implements OnInit, OnChanges {
  isAssetInfoMenuOpen = model(false);
  childAsset = model<any>({});
  activeIndex = model<number>(-1);

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
    });
  }

  ngOnInit() {}

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
  ];
}
