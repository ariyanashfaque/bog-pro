import {
  Input,
  input,
  OnInit,
  Output,
  Component,
  EventEmitter,
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
  IonCheckbox,
  IonSelectOption,
  IonSegmentButton,
} from "@ionic/angular/standalone";
import {
  AssetAreaFilterModel,
  AssetFilterModel,
  AssetModel,
  AssetSourceFilterModel,
  AssetStatusFilterModel,
  AssetTypeFilterModel,
} from "src/app/store/models/asset.model";
import { AssetFilter } from "src/app/utils/asset.util";

@Component({
  imports: [
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
    IonCheckbox,
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
  typesAssets: any;
  assetTypes: any[];
  SelectedAssets: any;
  selectedTypes: any[];
  assetFilter = AssetFilter;
  totalAssetFilter = AssetFilter;
  selectedTypesCount: number;
  SelectedBySourceAssets: any[];
  filteredTypeAssets: AssetModel[];
  filterName: string = "Asset type";
  filteredSourceAssets: AssetModel[];
  filteredStatusAssets: AssetModel[];
  filteredAssets: AssetModel[];
  // assetStatus: AssetStatusFilterModel[];
  assetSources: AssetSourceFilterModel[];
  assets = input.required<AssetModel[]>();
  selectedSoures: AssetSourceFilterModel[];
  selectedStatus: AssetStatusFilterModel[];
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { isSelected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

  TotalFilteredAssets: AssetFilterModel;
  // assetArea: AssetAreaFilterModel[];
  // assetType: AssetTypeFilterModel[];
  // assetSource: AssetSourceFilterModel[];
  assetStatus: AssetStatusFilterModel[];

  constructor() {
    this.assetTypes = [];
    this.typesAssets = [];
    this.selectedTypes = [];
    this.SelectedAssets = [];
    this.selectedSoures = [];
    this.selectedTypesCount = 0;
    this.filteredTypeAssets = [];
    this.SelectedassetTypes = [];
    this.filteredSourceAssets = [];
    this.filteredStatusAssets = [];
    this.SelectedBySourceAssets = [];
    this.filteredAssets = [];
    // this.assetArea = [];
    this.assetStatus = [];
    // this.assetType = [];
    // this.assetSource = [];
  }

  ngOnInit() {
    console.log("Filter", this.assetFilter);

    // AssetTypes
    // const parentTypes = new Set(
    //   this.assets().map((asset) => asset?.assetInfo?.assetParentType),
    // );
    // parentTypes.forEach((parentType) => {
    //   this.SelectedassetTypes.push({
    //     isSelected: false,
    //     assetType: parentType,
    //   });
    //   this.assetTypes.push(parentType);
    // });
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  filterCategory: any[] = ["Asset type", "Area", "Status", "Source"];
  // Sources: assetSource[] = ["assetBulkUpload", "assetManualCreation", "assetSapSync"];

  handleFilterCategory(categoryName: string) {
    this.selectedTypesCount = 0;

    this.filterName = categoryName;
  }
  //  by Asset type
  handlefilterbytype(event: any, type: any) {
    console.log(type);

    type.isSelected = !type.isSelected;

    this.assetFilter.filter((filter) => {
      filter.filters.filter((selectedFilter) => {
        selectedFilter.isSelected;
      });
    });

    // this.totalAssetFilter. = this.assetFilter?.filter(
    //   (source) => source.isSelected,
    // );
  }

  // Filter by asset source
  handlefilterbySource(source: AssetSourceFilterModel) {
    // source.isSelected = !source.isSelected;
    // this.TotalFilteredAssets.assetSource = this.assetFilter.assetSource?.filter(
    //   (source) => source.isSelected,
    // );
  }

  // filter by status
  handlefilterbyStatus(status: AssetStatusFilterModel) {
    // status.isSelected = !status.isSelected;
    // this.TotalFilteredAssets.assetStatus = this.assetFilter.assetSource?.filter(
    //   (source) => source.isSelected,
    // );
  }

  Filter(event: any) {
    console.log(this.assetFilter);

    this.filterByTypes.emit(this.assetFilter);
  }
}
