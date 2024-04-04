import { Component, effect, input, model, OnInit } from "@angular/core";
import { RoundProgressComponent } from "angular-svg-round-progressbar";

@Component({
  selector: "app-child-asset-modal",
  standalone: true,
  templateUrl: "./child-asset-modal.component.html",
  styleUrls: ["./child-asset-modal.component.scss"],
  imports: [RoundProgressComponent],
})
export class ChildAssetModalComponent implements OnInit {
  isAssetInfoMenuOpen = model(false);
  childAsset = model<any>({});
  activeIndex = model<number>(-1);

  onAssetClick(asset: any, index: number) {
    this.isAssetInfoMenuOpen.update((isAssetInfoMenuOpen) => true);
    this.activeIndex.update(() => index);
    this.childAsset.update(() => this.subAssets[this.activeIndex()]);
  }

  constructor() {}

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
