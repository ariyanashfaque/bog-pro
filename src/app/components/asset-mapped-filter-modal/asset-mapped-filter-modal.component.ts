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
import { AssetModel } from "src/app/store/models/asset.model";

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
  assetSources: any[];
  SelectedAssets: any;
  selectedTypes: any[];
  selectedTypesCount: number;
  filterName: string = "Asset type";
  assets = input.required<AssetModel[]>();
  @Input() isFilterMenuOpen: boolean = false;
  @Output() filterByTypes = new EventEmitter<any>();
  SelectedassetTypes: { selected?: boolean; assetType?: any }[];
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);
  SelectedassetSource: { selected?: boolean; assetSource?: any }[];
  selectedSource: any;
  SelectedBySourceAssets: any[];
  constructor() {
    this.assetTypes = [];
    this.typesAssets = [];
    this.assetSources = [];
    this.selectedTypes = [];
    this.SelectedBySourceAssets = [];
    this.SelectedAssets = [];
    this.selectedTypesCount = 0;
    this.SelectedassetTypes = [];
    this.SelectedassetSource = [];
    this.selectedSource = [];
  }

  ngOnInit() {
    this.assetTypes = [];
    this.assetSources = [];
    console.log(this.assets());

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

    // Asset Sources
    this.Sources.forEach((source) => {
      this.SelectedassetSource.push({
        selected: false,
        assetSource: source,
      });
    });

    this.assetSources.forEach((asset: any) => {
      console.log(asset);
    });

    console.log(this.SelectedassetSource);
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  filterCategory: any[] = ["Asset type", "Area", "Status", "Source"];
  Sources: any[] = ["assetBulkUpload", "assetManualCreation", "assetSapSync"];

  handleFilterCategory(categoryName: string) {
    this.filterName = categoryName;
  }
  // Filter by Asset type
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
  handlefilterbySource(event: any, source: any) {
    source.selected = !source.selected;
    // this.selectedTypesCount = this.SelectedassetTypes?.filter(
    //   (type) => type.selected,
    // ).length;

    this.selectedSource = this.SelectedassetSource?.filter(
      (source) => source.selected,
    );

    console.log(this.selectedSource);
  }
  FilterByType(event: any) {
    this.typesAssets = [];
    this.selectedTypes.forEach((asset) => {
      this.SelectedAssets.push(
        this.assets().filter(
          (assets) => assets?.assetInfo?.assetType === asset.assetType,
        ),
      );
    });
    console.log(this.SelectedAssets);
    this.filterByTypes.emit(this.SelectedAssets);

    // Source filter

    this.selectedSource.forEach((source: any) => {
      console.log(source);

      this.assets().filter((a) => {
        if (source.selected === a.assetSource?.assetBulkUpload) {
          console.log(a);
        } else if (source.selected === a.assetSource?.assetManualCreation) {
          console.log(a);
        } else if (source.selected === a.assetSource?.assetManualCreation) {
          console.log(a);
        }
        // switch (true) {
        //   case a.assetSource?.assetBulkUpload:
        //     if (source.selected === a.assetSource.assetBulkUpload) {
        //       console.log(a);
        //     }
        //     // code

        //     // this.SelectedBySourceAssets.push(a.assetSource===source);

        //     break;
        //   case a.assetSource?.assetManualCreation:
        //     if (source.selected === a.assetSource.assetManualCreation) {
        //       console.log(a);
        //     }

        //     // code
        //     // console.log(a);

        //     // this.SelectedBySourceAssets.push(a);

        //     break;
        //   case a.assetSource?.assetSapSync:
        //     if (source.selected === a.assetSource.assetSapSync) {
        //       console.log(a);
        //     }

        //     // code
        //     // console.log(a);

        //     // this.SelectedBySourceAssets.push(a);

        //     break;
        // }
      });
      console.log(this.SelectedBySourceAssets);
    });
    console.log(this.SelectedBySourceAssets);
  }
}
