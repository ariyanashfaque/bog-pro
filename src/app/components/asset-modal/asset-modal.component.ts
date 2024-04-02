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

@Component({
  selector: "app-asset-modal",
  templateUrl: "./asset-modal.component.html",
  styleUrls: ["./asset-modal.component.scss"],
  standalone: true,
  imports: [IonText, IonIcon],
})
export class AssetModalComponent implements OnInit {
  isMenuOpen = model<boolean>();
  isChildOpen = model<boolean>();
  isSubAssetModalOpen = model<boolean>(false);
  activeAccordion: string = "recommended";
  // array model
  assetData = input<any[]>();
  selectedAsset = output<any>();
  selectedIndex = signal<number>(-1);

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

  onAssetClick(asset: any, index: number) {
    this.selectedAsset.emit(asset);
    if (this.selectedIndex() === index) {
      this.selectedIndex.update(() => -1);
    } else {
      this.selectedIndex.update(() => index);
    }
    console.log("Index: ", this.selectedIndex());
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
