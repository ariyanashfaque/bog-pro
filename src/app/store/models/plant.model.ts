// * Location Model * //
interface LocationModel {
  latitude: number;
  longitude: number;
  locationId: "";
}

// * Image Model * //
interface ImageModel {
  id: string;
  src: string;
  fileType: string;
  originalName: string;
}

// * Locations Model * //
interface PlantsLocationsModel {
  id: string;
  location: string;
}

// * Locations Level Model * //
export interface PlantLocationsLevelModel {
  l0?: PlantsLocationsModel;
  l1?: PlantsLocationsModel;
  l2?: PlantsLocationsModel;
  l3?: PlantsLocationsModel;
  l4?: PlantsLocationsModel;
  l5?: PlantsLocationsModel;
  l6?: PlantsLocationsModel;
  l7?: PlantsLocationsModel;
  l8?: PlantsLocationsModel;
}

// * Asset Approval Model * //
interface AssetSourceModel {
  sapSync: boolean;
  bulkUpload: boolean;
  manualCreation: boolean;
}

// * Asset Approval Model * //
interface AssetApprovalModel {
  assetApproved: boolean;
  assetApprovedBy: string;
  assetApprovedAt: string;
}

// * Asset Rejection Model * //
interface AssetRejectionModel {
  assetRejected: boolean;
  assetRejectedBy: string;
  assetRejectedAt: string;
  reasonsForRejection: string[];
}

// * Asset Status Model * //
interface AssetRegisteredStatusModel {
  assetInDraft: boolean;
  assetDeleted: boolean;
  assetApproved: boolean;
  assetRegistered: boolean;
  assetPendingForApproval: boolean;
  assetRejectedByApprover: boolean;
  assetDeletionApprovalPending: boolean;
}

// * Asset Silo Category Model * //
interface AssetSimCategoryModel {
  wallThickness: string;
  storedMaterial: string;
  wallThicknessUnit: number;
  wallThicknessKnown: boolean;
}

// * Asset Category Model * //
interface AssetCategoryModel {
  sim?: boolean;
  quarry?: boolean;
  insurance?: boolean;
  electrical?: boolean;
  environment?: boolean;
  hotMaterial?: boolean;
  fireProtection?: boolean;
  materialManagement?: boolean;
}

// * Asset Info Model * //
interface AssetInfoModel {
  sapId?: string;
  assetId?: string;
  assetName?: string;
  assetType?: string;
  costCenter?: string;
  assetStatus?: string;
  assetParentType?: string;
  assetImages?: ImageModel[];
  assetLocation?: LocationModel;
}

// * Asset Model * //
export interface AssetsModel {
  id?: string;
  assetInfo?: AssetInfoModel;
  assetSource?: AssetSourceModel;
  assetSim?: AssetSimCategoryModel;
  assetApproval?: AssetApprovalModel;
  assetQuarry?: AssetSimCategoryModel;
  assetRejection?: AssetRejectionModel;
  assetCategories?: AssetCategoryModel;
  assetInsurance?: AssetSimCategoryModel;
  assetElectrical?: AssetSimCategoryModel;
  assetEnvironment?: AssetSimCategoryModel;
  assetHotMaterial?: AssetSimCategoryModel;
  assetFireProtection?: AssetSimCategoryModel;
  assetMaterialManagement?: AssetSimCategoryModel;
  assetRegisteredStatus?: AssetRegisteredStatusModel;
}

// * Plants Template Model * //
export interface PlantsModel {
  id?: string;
  plantId?: string;
  plantName?: string;
  createdAt?: string;
  createdBy?: string;
  plantCode?: string;
  assets?: AssetsModel[];
  lastUpdatedBy?: string;
  lastModifiedDate?: string;
  totalMappedAssets?: number;
  totalRejectedAssets?: number;
  totalApprovedAssets?: number;
}

export interface CategoriesModel {
  id: string;
  type: string;
  order: number;
  title: string;
  categoryType: string;
}

export interface PlantsStoreModel {
  isLoading: boolean;
  plants: PlantsModel[];
  categories: CategoriesModel[];
}
export interface PlantsResponse {
  message: string;
  data: PlantsStoreModel;
}
