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
import { AssetFilter } from "src/app/utils/asset.util";
import { AssetModel, AssetFilterModel } from "src/app/store/models/asset.model";

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
  selectedTypes: any[];
  assetFilter = AssetFilter;
  selectedTypesCount: number;
  filteredAssets: AssetModel[];
  SelectedBySourceAssets: any[];
  totalAssetFilter = AssetFilter;
  filteredTypeAssets: AssetModel[];
  SelectedAssets: AssetFilterModel;
  filterName: string = "Asset type";
  filteredSourceAssets: AssetModel[];
  filteredStatusAssets: AssetModel[];
  assets = input.required<AssetModel[]>();
  // assetStatus: AssetStatusFilterModel[];
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { isSelected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

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
    this.SelectedAssets = {
      assetSource: {
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
      assetType: ["silo"],
    };
  }

  ngOnInit() {
    // AssetTypes
    const parentTypes = new Set(
      this.assets().map((asset) => asset?.assetInfo?.assetType),
    );
    parentTypes.forEach((assetType) => {
      // this.assetTypes.push(assetType);
    });

    // console.log(this.assetTypes);
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
  handlefilterbytype(fieldType: any, type: any) {
    type.isSelected = !type.isSelected;

    if (fieldType.filterType === "assetType") {
      this.selectedTypes.push(type);
    }

    // if (type.isSelected && type.type === "silo") {
    //   this.selectedTypes.push(type.type);
    // }
    // if (type.isSelected && type.type === "hopper") {
    //   this.selectedTypes.push(type.type);
    // }
    // if (type.isSelected && type.type === "bridge") {
    //   this.selectedTypes.push(type.type);
    // }
    // if (type.isSelected && type.type === "bin") {
    //   this.selectedTypes.push(type.type);
    // }

    if (type.isSelected && type.type === "assetSapSync") {
      this.SelectedAssets.assetSource.assetSapSync = true;
    }
    if (type.isSelected && type.type === "assetBulkUpload") {
      this.SelectedAssets.assetSource.assetBulkUpload = true;
    }
    if (type.isSelected && type.type === "assetManualCreation") {
      this.SelectedAssets.assetSource.assetManualCreation = true;
    }

    if (type.isSelected && type.type === "assetApprovalPending") {
      this.SelectedAssets.assetStatus.assetApprovalPendinng = true;
    }
    if (type.isSelected && type.type === "assetApproved") {
      this.SelectedAssets.assetStatus.assetApproved = true;
    }
    if (type.isSelected && type.type === "assetRejected") {
      this.SelectedAssets.assetStatus.assetRejected = true;
    }
    if (type.isSelected && type.type === "assetInDraft") {
      this.SelectedAssets.assetStatus.assetInDraft = true;
    }
    // console.log(this.SelectedAssets.assetSoruce);

    // console.log(fieldType);
    // console.log(type);

    // this.assetFilter.filter((filter) => {
    //   filter.filters.filter((selectedFilter) => {
    //     selectedFilter.isSelected;
    //   });
    // });

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
    this.selectedTypes.forEach((aset) => {
      this.assetTypes.push(aset.type);
    });
    this.SelectedAssets.assetType = this.assetTypes;

    // console.log(this.SelectedAssets);
    this.filterByTypes.emit(this.SelectedAssets);
  }
}
