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
import { AssetModel, FilterModel } from "src/app/store/models/asset.model";
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
  SelectedAssets: FilterModel[];
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
  assets = input.required<AssetModel[]>();
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { isSelected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

  // assetArea: AssetAreaFilterModel[];
  // assetType: AssetTypeFilterModel[];
  // assetSource: AssetSourceFilterModel[];

  constructor() {
    this.assetTypes = [];
    this.typesAssets = [];
    this.selectedTypes = [];
    this.selectedTypesCount = 0;
    this.filteredTypeAssets = [];
    this.SelectedassetTypes = [];
    this.filteredSourceAssets = [];
    this.filteredStatusAssets = [];
    this.SelectedBySourceAssets = [];
    this.filteredAssets = [];
    this.SelectedAssets = [
      {
        assetSoruce: {
          assetSapSync: false,
          assetBulkUpload: false,
          assetManualCreation: false,
        },

        assetStatus: {
          assetInDraft: false,
          assetRejected: false,
          assetApproved: false,
          assetApprovalPendinng: false,
        },

        assetArea: [],
        assetType: [],
      },
    ];
  }

  ngOnInit() {
    console.log("Filter", this.SelectedAssets);

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
  handlefilterbySource(source: any) {}

  // filter by status
  handlefilterbyStatus(status: any) {
    // status.isSelected = !status.isSelected;
    // this.TotalFilteredAssets.assetStatus = this.assetFilter.assetSource?.filter(
    //   (source) => source.isSelected,
    // );
  }

  Filter(event: any) {
    this.assetFilter.forEach((filter) => {
      if (filter.filterType === "assetType") {
        filter.filters.forEach((element) => {
          if (element.isSelected) {
            console.log(element.type);

            this.SelectedAssets.forEach(asset=>{
              asset.assetType
            })
          }
        });
      }
    });
    console.log(this.assetFilter);
    console.log(this.SelectedAssets);

    this.filterByTypes.emit(this.assetFilter);
  }
}
