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
  AssetModel,
  AssetSourceFilterModel,
  AssetStatusFilterModel,
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
  SelectedAssets: any;
  selectedTypes: any[];
  selectedTypesCount: number;
  SelectedBySourceAssets: any[];
  filteredTypeAssets: AssetModel[];
  filterName: string = "Asset type";
  filteredSourceAssets: AssetModel[];
  filteredStatusAssets: AssetModel[];
  filteredAssets: AssetModel[];
  assetStatus: AssetStatusFilterModel[];
  assetSources: AssetSourceFilterModel[];
  assets = input.required<AssetModel[]>();
  selectedSoures: AssetSourceFilterModel[];
  selectedStatus: AssetStatusFilterModel[];
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { selected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

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
    this.assetSources = [
      {
        selected: false,
        title: "Sap Sync",
        source: "assetSapSync",
      },
      {
        selected: false,
        title: "Bulk Upload",
        source: "assetBulkUpload",
      },
      {
        selected: false,
        title: "Manual Creation",
        source: "assetManualCreation",
      },
    ];

    this.assetStatus = [
      {
        selected: false,
        title: "Asset Approval Pending",
        status: "assetApprovalPending",
      },
      {
        selected: false,
        title: "Asset Approved",
        status: "assetApproved",
      },
      {
        selected: false,
        title: "Asset In Draft",
        status: "assetInDraft",
      },
      {
        selected: false,
        title: "Asset Rejected",
        status: "assetRejected",
      },
    ];
  }

  ngOnInit() {
    // AssetTypes
    const parentTypes = new Set(
      this.assets().map((asset) => asset?.assetInfo?.assetParentType),
    );
    parentTypes.forEach((parentType) => {
      this.SelectedassetTypes.push({
        selected: false,
        assetType: parentType,
      });
      this.assetTypes.push(parentType);
    });
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
  handlefilterbytype(event: any, assetType: any) {
    assetType.selected = !assetType.selected;

    this.selectedTypesCount = this.SelectedassetTypes?.filter(
      (type) => type.selected,
    ).length;

    this.selectedTypes = this.SelectedassetTypes?.filter(
      (type) => type.selected,
    );
  }

  // Filter by asset source
  handlefilterbySource(source: AssetSourceFilterModel) {
    source.selected = !source.selected;
    this.selectedSoures = this.assetSources?.filter(
      (source) => source.selected,
    );
    this.selectedTypesCount = this.assetSources?.filter(
      (type) => type.selected,
    ).length;
  }

  // filter by status
  handlefilterbyStatus(status: AssetStatusFilterModel) {
    status.selected = !status.selected;
    this.selectedStatus = this.assetStatus?.filter((status) => status.selected);
    this.selectedTypesCount = this.assetStatus?.filter(
      (status) => status.selected,
    ).length;
  }

  Filter(event: any) {
    // filter by source
    if (this.selectedSoures) {
      this.filteredSourceAssets = [];
    }
    this.selectedSoures.forEach((source) => {
      this.assets().forEach((asset) => {
        if (
          source?.source === "assetSapSync" &&
          source?.selected === asset.assetSource?.assetSapSync
        ) {
          this.filteredSourceAssets.push(asset);
        }
        if (
          source?.source === "assetBulkUpload" &&
          source?.selected === asset.assetSource?.assetBulkUpload
        ) {
          this.filteredSourceAssets.push(asset);
        }
        if (
          source?.source === "assetManualCreation" &&
          source?.selected === asset.assetSource?.assetManualCreation
        ) {
          this.filteredSourceAssets.push(asset);
        }
      });
    });
    console.log("Filter by Source:", this.filteredSourceAssets);

    // filter by status
    this.filteredStatusAssets = [];
    this.selectedStatus.forEach((status) => {
      this.assets().forEach((asset) => {
        if (
          status?.status === "assetApprovalPending" &&
          status?.selected === asset.assetStatus?.status?.assetApprovalPendinng
        ) {
          this.filteredStatusAssets.push(asset);
        }
        if (
          status?.status === "assetApproved" &&
          status?.selected === asset.assetStatus?.status?.assetApproved
        ) {
          this.filteredStatusAssets.push(asset);
        }
        if (
          status?.status === "assetInDraft" &&
          status?.selected === asset.assetStatus?.status?.assetInDraft
        ) {
          this.filteredStatusAssets.push(asset);
        }
        if (
          status?.status === "assetRejected" &&
          status?.selected === asset.assetStatus?.status?.assetRejected
        ) {
          this.filteredStatusAssets.push(asset);
        }
      });
    });

    console.log("Filter by Status:", this.filteredStatusAssets);

    // filter by type
    this.filteredTypeAssets = [];
    this.selectedTypes.forEach((type) => {
      this.assets().forEach((asset) => {
        if (asset?.assetInfo?.assetType === type.assetType) {
          this.filteredTypeAssets.push(asset);
        }
      });
    });
    console.log("Filter by Type:", this.filteredTypeAssets);

    this.filteredSourceAssets.forEach((asset) => {
      this.filteredAssets.push(asset);
    });
    this.filteredStatusAssets.forEach((asset) => {
      this.filteredAssets.push(asset);
    });
    this.filteredTypeAssets.forEach((asset) => {
      this.filteredAssets.push(asset);
    });

    console.log(this.filteredAssets);

    this.filterByTypes.emit(this.filteredTypeAssets);
  }
}
