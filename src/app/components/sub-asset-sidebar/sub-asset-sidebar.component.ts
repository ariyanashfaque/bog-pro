import {
  Component,
  OnInit,
  model,
  effect,
  signal,
  output,
  inject,
} from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonText,
  IonIcon,
  IonLabel,
  IonTitle,
  IonInput,
  IonSelect,
  IonAvatar,
  IonButton,
  IonButtons,
  IonTextarea,
  IonSelectOption,
} from "@ionic/angular/standalone";
import { DndModule } from "ngx-drag-drop";
import { DndEvent } from "ngx-drag-drop/lib/dnd-utils";
import { MapSidebarService } from "src/app/services/map-sidebar/map-sidebar.service";

@Component({
  selector: "app-sub-asset-sidebar",
  templateUrl: "./sub-asset-sidebar.component.html",
  styleUrls: ["./sub-asset-sidebar.component.scss"],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonGrid,
    IonItem,
    IonList,
    IonInput,
    IonLabel,
    IonTitle,
    IonButton,
    IonAvatar,
    IonSelect,
    DndModule,
    IonButtons,
    IonTextarea,
    IonSelectOption,
  ],
})
export class SubAssetSidebarComponent implements OnInit {
  mapSidebarService = inject(MapSidebarService);
  // isMenuOpen = model(false);
  isMenuOpen = signal(false);
  selectedAsset = model<any>({});
  draggedAsset = output<any>();

  constructor() {
    effect(() => {
      console.log("selectedAsset in sub asset modal", this.selectedAsset());
    });
    this.mapSidebarService.getisSubAssetModalOpen.subscribe((data) => {
      this.isMenuOpen.set(data);
    });
  }

  ngOnInit() {}

  draggedAssetRecieved(recievedAsset: any) {
    this.draggedAsset.emit(recievedAsset);
  }

  showDetails(recievedAsset: any) {
    console.log(recievedAsset);
  }

  menuToggle() {
    this.isMenuOpen.update((isMenuOpen) => !isMenuOpen);
  }
}
