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
import {
  AssetModel,
  AssetFilterModel,
  Filter,
} from "src/app/store/models/asset.model";

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
  selectedTypes: any;
  assetFilter = AssetFilter;
  selectedTypesCount: number;
  filteredAssets: AssetModel[];
  SelectedBySourceAssets: any[];
  totalAssetFilter = AssetFilter;
  filteredTypeAssets: AssetModel[];
  SelectedAssets: AssetFilterModel;
  filterName: string = "assetType";
  filteredSourceAssets: AssetModel[];
  filteredStatusAssets: AssetModel[];
  assets = input.required<AssetModel[]>();
  // assetStatus: AssetStatusFilterModel[];
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { isSelected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);
  draftAssets: AssetModel[];
  registeredAssets: AssetModel[];
  filter: Filter;
  keyValuePairs: { key: string; value: any }[] = [];

  constructor() {
    this.draftAssets = [];
    this.registeredAssets = [];

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

    this.filter = {
      assetType: [],
      assetArea: [],
      assetSource: [],
      assetStatus: [],
    };

    // this.SelectedAssets = {
    //   assetSource: {
    //     assetSapSync: false,
    //     assetBulkUpload: false,
    //     assetManualCreation: false,
    //   },

    //   assetStatus: {
    //     assetInDraft: false,
    //     assetRejected: false,
    //     assetApproved: false,
    //     assetApprovalPendinng: false,
    //   },

    //   assetArea: [],
    //   assetType: ["silo"],
    // };
  }

  ngOnInit() {
    console.log(this.assets());
    // console.log(this.filter);

    const keyValuePairs: { key: string; value: any }[] = [];

    // Iterate over each property of the filter object
    for (const [key, value] of Object.entries(this.filter)) {
      // Push the key-value pair into the array
      keyValuePairs.push({ key, value });
    }

    this.selectedTypes = keyValuePairs;

    // Populate assetType if it is defined
    this.assets().forEach((asset: any) => {
      const assetType = asset.assetInfo?.assetType;
      const existingType = this.filter.assetType?.find(
        (type: any) => type.type === assetType,
      );
      if (!existingType) {
        this.filter.assetType?.push({
          type: assetType,
          title: assetType,
          isSelected: false,
        });
      }

      // Populate assetSource
      if (asset.assetSource) {
        Object.keys(asset.assetSource).forEach((sourceKey) => {
          const sourceType = sourceKey;
          const existingSource = this.filter.assetSource.find(
            (source: any) => source.type === sourceType,
          );
          if (!existingSource) {
            this.filter.assetSource.push({
              type: sourceType,
              title: sourceType,
              isSelected: false,
            });
          }
        });
      }
      // Populate assetStatus if it is defined
      if (asset.assetStatus) {
        Object.keys(asset.assetStatus.status).forEach((statusKey: string) => {
          const statusType = statusKey;
          const existingStatus = this.filter.assetStatus.find(
            (status: any) => status.type === statusType,
          );
          if (!existingStatus) {
            this.filter.assetStatus.push({
              type: statusType,
              title: statusType,
              isSelected: false,
            });
          }
        });
      }
    });

    // Group asset types
    const parentTypes = new Set(
      this.assets().map((asset) => asset?.assetInfo?.assetType),
    );
    parentTypes.forEach((assetType) => {
      this.assetTypes.push(assetType);
    });

    console.log("Asset types:", this.assetTypes);
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  handleFilterCategory(categoryName: string) {
    this.selectedTypesCount = 0;

    this.filterName = categoryName;
  }
  //  by Asset type
  handlefilterbytype(fieldType: any, type: any) {
    // console.log(this.selectedTypes);
    // console.log(this.filter);
    type.isSelected = !type.isSelected;
  }

  // Filter by asset source
  handlefilterbySource(source: any) {}

  // filter by status
  handlefilterbyStatus(status: any) {}

  Filter(event: any) {
    console.log(this.filter);

    this.filterByTypes.emit(this.filter);
  }
}
