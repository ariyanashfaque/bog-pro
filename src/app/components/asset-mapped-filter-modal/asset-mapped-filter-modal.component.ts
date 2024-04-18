import { HttpErrorResponse } from "@angular/common/http";
import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
  input,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  IonImg,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonList,
  IonGrid,
  IonText,
  IonLabel,
  IonModal,
  IonTitle,
  IonInput,
  IonHeader,
  IonButton,
  IonFooter,
  IonSelect,
  IonContent,
  IonToolbar,
  IonButtons,
  IonSegment,
  IonTextarea,
  IonSelectOption,
  IonSegmentButton,
  LoadingController,
  IonCheckbox,
} from "@ionic/angular/standalone";
import { AssetModel } from "src/app/store/models/asset.model";

@Component({
  imports: [
    IonCheckbox,
    IonCol,
    IonImg,
    IonRow,
    IonText,
    IonGrid,
    IonList,
    IonItem,
    IonIcon,
    IonInput,
    IonTitle,
    IonModal,
    IonLabel,
    IonFooter,
    IonButton,
    IonHeader,
    IonSelect,
    IonSegment,
    IonButtons,
    IonToolbar,
    IonContent,
    IonTextarea,
    FormsModule,
    IonSelectOption,
    IonSegmentButton,
    ReactiveFormsModule,
  ],
  standalone: true,
  selector: "app-asset-mapped-filter-modal",
  templateUrl: "./asset-mapped-filter-modal.component.html",
  styleUrls: ["./asset-mapped-filter-modal.component.scss"],
})
export class AssetMappedFilterModalComponent implements OnInit {
  @Input() isFilterMenuOpen: boolean = false;
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);
  @Output() filterClick = new EventEmitter<string>();

  assets = input.required<AssetModel[]>();

  filterName: string = "Asset type";

  constructor() {}

  ngOnInit() {
    // console.log(this.filterClick);
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  filterCategory: any[] = ["Asset type", "Area", "Status", "Source"];

  filterBySource: any[] = [
    "Silo",
    "Bin",
    "Tank",
    "Hopper",
    "Conveyor",
    "Truss Gantry",
    "Stacker",
    "Reclaimer",
    "Support Structure",
    "tunnel",
    "Basement",
    "Retaining Wall",
    "drainage system",
    "Pit",
    "water",
    "Steam",
    "Gas",
  ];

  handleFilterCategory(categoryName: string) {
    this.filterName = categoryName;
  }

  handleFilerBySource(event: any, sourceName: string) {
    // console.log(event);
    // console.log(sourceName);
  }
  FilterByType(event: any) {
    this.filterClick.emit("silo");
    console.log(event);
  }
}
