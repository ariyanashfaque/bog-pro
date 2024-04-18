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
  @Output() filterClick = new EventEmitter<any>();

  assets = input.required<AssetModel[]>();
  assetTypes: any[];
  selectedType: any[];

  filterName: string = "Asset type";

  constructor() {
    this.assetTypes = [];
    this.selectedType = [];
  }

  ngOnInit() {
    const parentTypes = new Set(
      this.assets().map((asset) => asset?.assetInfo?.assetParentType),
    );

    this.assetTypes = [];
    parentTypes.forEach((parentType) => {
      this.assetTypes.push(parentType);
    });
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  filterCategory: any[] = ["Asset type", "Area", "Status", "Source"];

  handleFilterCategory(categoryName: string) {
    this.filterName = categoryName;
  }

  handlefilterbytype(event: any, assetType: any) {
    this.selectedType.push(assetType);
  }
  FilterByType(event: any) {
    this.filterClick.emit(this.selectedType);
  }
}
