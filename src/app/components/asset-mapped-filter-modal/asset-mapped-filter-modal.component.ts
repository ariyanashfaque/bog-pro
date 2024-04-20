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
  SelectedAssets: any;
  typesAssets: any;
  assetTypes: any[];
  selectedType: any;
  filteredAsset: any;
  selectedTypeCount: string;
  filterName: string = "Asset type";
  assets = input.required<AssetModel[]>();
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.assetTypes = [];
    this.selectedType = [];
    this.SelectedAssets = [];
    this.typesAssets = [];
    this.filteredAsset = [];
    this.selectedTypeCount = "";
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
    this.SelectedAssets = this.assets().filter(
      (asset) => asset?.assetInfo?.assetType === assetType,
    );
    this.typesAssets.push(this.SelectedAssets);
  }
  FilterByType(event: any) {
    this.filterByTypes.emit(this.typesAssets);
  }
}
