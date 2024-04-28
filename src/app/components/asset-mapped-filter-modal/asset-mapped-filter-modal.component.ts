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
import { Filter, AssetModel } from "src/app/store/models/asset.model";

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
  filter: Filter;
  selectedTypes: any;
  selectedTypeCount: any;
  selectedTypesCount: number;
  filterName: string = "assetType";
  savedFilter = input.required<Filter>();
  assets = input.required<AssetModel[]>();
  @Input() isFilterMenuOpen: boolean = false;
  keyValuePairs: { key: string; value: any }[] = [];
  @Output() filterByTypes = new EventEmitter<any>();
  @Output() isFilterToggleOpen = new EventEmitter<boolean>(false);

  constructor() {
    this.selectedTypes = [];
    this.selectedTypeCount = {};
  }

  ngOnInit() {
    if (this.savedFilter()) {
      this.filter = this.savedFilter();
    } else {
      this.filter = {
        assetType: [],
        assetArea: [],
        assetSource: [],
        assetStatus: [],
      };
    }
    const countSelectedItems = (category: any) => {
      return category.reduce((count: any, item: any) => {
        return count + (item.isSelected ? 1 : 0);
      }, 0);
    };

    // Count selected items for each Type
    this.selectedTypeCount = {
      assetType: countSelectedItems(this.filter.assetType),
      assetArea: countSelectedItems(this.filter.assetArea),
      assetSource: countSelectedItems(this.filter.assetSource),
      assetStatus: countSelectedItems(this.filter.assetStatus),
    };

    const keyValuePairs: { key: string; value: any }[] = [];
    for (const [key, value] of Object.entries(this.filter)) {
      keyValuePairs.push({ key, value });
    }
    this.selectedTypes = keyValuePairs;

    // Populate assetType
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
      // Populate assetStatus
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
  }

  menuToggle() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    this.isFilterToggleOpen.emit(this.isFilterMenuOpen);
  }

  handleFilterCategory(categoryName: string) {
    this.filterName = categoryName;
  }
  //  by Asset filter type
  handlefilterbytype(fieldType: any, type: any) {
    type.isSelected = !type.isSelected;

    const countSelectedItems = (category: any) => {
      return category.reduce((count: any, item: any) => {
        return count + (item.isSelected ? 1 : 0);
      }, 0);
    };

    // Count selected items for each Type
    this.selectedTypeCount = {
      assetType: countSelectedItems(this.filter.assetType),
      assetArea: countSelectedItems(this.filter.assetArea),
      assetSource: countSelectedItems(this.filter.assetSource),
      assetStatus: countSelectedItems(this.filter.assetStatus),
    };
  }

  // Save button
  Filter() {
    this.filterByTypes.emit(this.filter);
  }

  // Reset Selected
  Reset() {
    for (const categoryKey in this.filter) {
      if (Object.prototype.hasOwnProperty.call(this.filter, categoryKey)) {
        const category = this.filter[categoryKey as keyof Filter];
        category.forEach((item: any) => {
          item.isSelected = false;
        });
      }
    }
    const countSelectedItems = (category: any) => {
      return category.reduce((count: any, item: any) => {
        return count + (item.isSelected ? 0 : 0);
      }, 0);
    };
    this.selectedTypeCount = {
      assetType: countSelectedItems(this.filter.assetType),
      assetArea: countSelectedItems(this.filter.assetArea),
      assetSource: countSelectedItems(this.filter.assetSource),
      assetStatus: countSelectedItems(this.filter.assetStatus),
    };
  }
}
