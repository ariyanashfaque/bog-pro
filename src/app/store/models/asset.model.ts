// * Asset Zone Model * //
interface AssetZoneModel {
  id?: string;
  area?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Keyable {
  [key: string]: boolean | undefined;
}

// * Asset Approval Model * //
export interface AssetSourceModel extends Keyable {
  assetSapSync: boolean;
  assetBulkUpload: boolean;
  assetManualCreation: boolean;
}

interface AssetDraftRegisteredStatusModel extends Keyable {
  assetInDraft?: boolean;
  assetRejected?: boolean;
  assetApproved?: boolean;
  assetRegistered?: boolean;
  assetApprovalPending?: boolean;
  assetDemolishedPending?: boolean;
  assetDemolitionApproved?: boolean;
  assetDemolitionRejected?: boolean;
  assetDecommissionRejected?: boolean;
  assetDecommissionApproved?: boolean;
  assetDecommissionedPending?: boolean;
}

export class MarkerModel {
  lng: number;
  lat: number;
}

// * Image Model * //
interface AssetImageModel {
  id: string;
  src: string;
  fileType: string;
  originalName: string;
}

interface UserModel {
  email: string;
  lastName: string;
  firstName: string;
}

// * Site Location Model * //
interface LocationModel {
  path: string;
  level: string;
  active: string;
  is_gru: string;
  location: string;
  unique_id: string;
  sap_key_code: string;
  location_code: string;
  work_group_status: string;
}
export interface FilteredAssetModel extends AssetModel {
  filteredByType?: boolean;
  filteredBySource?: boolean;
  filteredByStatus?: boolean;
}
export interface Filter {
  assetType: { type?: string; title?: string; isSelected: boolean }[];
  assetArea: { type?: string; title?: string; isSelected: boolean }[];
  assetSource: { isSelected: boolean; type: string; title: string }[];
  assetStatus: { isSelected: boolean; type: string; title: string }[];
}

// * Asset Approval Model * //
export interface AssetSourceModel {
  assetSapSync: boolean;
  assetBulkUpload: boolean;
  assetManualCreation: boolean;
}

// * Asset Category Model * //
export interface AssetCategoryModel {
  order: number;
  isSelected: boolean;
  categoryType: string;
  categoryTitle: string;
}

// * Asset Silo Category Model * //
interface AssetSimCategoryModel {
  wallThickness: string;
  storedMaterial: string;
  wallThicknessUnit: number;
  wallThicknessKnown: boolean;
}

// * Asset Info Model * //
export interface AssetInfoModel {
  sapId?: string;
  assetName: string;
  assetType: string;
  assetStatus?: string;
  assetParentType: string;
  assetCostCenter?: string;
  assetZone?: AssetZoneModel;
  assetImages?: AssetImageModel[];
  iconPath: string;
}

export interface AssetDraftStatus {
  assetInDraft: boolean;
  assetRejected: boolean;
  assetApproved: boolean;
  assetApprovalPending: boolean;
}

export interface AssetRegisteredStatus {
  assetRegistered: boolean;
  assetDemolishedPending: boolean;
  assetDemolitionApproved: boolean;
  assetDemolitionRejected: boolean;
  assetDecommissionApproved: boolean;
  assetDecommissionRejected: boolean;
  assetDecommissionedPending: boolean;
}

// interface AssetDraftRegisteredStatusModel {
//   assetInDraft: boolean;
//   assetRejected: boolean;
//   assetApproved: boolean;
//   assetRegistered: boolean;
//   assetApprovalPending: boolean;
//   assetDemolishedPending: boolean;
//   assetDemolitionApproved: boolean;
//   assetDemolitionRejected: boolean;
//   assetDecommissionRejected: boolean;
//   assetDecommissionApproved: boolean;
//   assetDecommissionedPending: boolean;
// }

export interface AssetStatusModel {
  isDraft?: boolean;
  isRegistered?: boolean;
  status: AssetDraftRegisteredStatusModel;
}
// * Asset Filter Model * //
export interface AssetFilterModel {
  assetType: string[];
  assetArea: string[];
  assetSource: SourceFilterModel;
  assetStatus: StatusFilterModel;
}
export interface SourceFilterModel {
  assetSapSync?: boolean;
  assetBulkUpload?: boolean;
  assetManualCreation?: boolean;
}
export interface StatusFilterModel {
  assetInDraft?: boolean;
  assetRejected?: boolean;
  assetApproved?: boolean;
  assetApprovalPendinng?: boolean;
}

// * Asset Model * //
export interface AssetModel {
  id?: string;
  assetInfo?: AssetInfoModel;
  assetSource?: AssetSourceModel;
  assetStatus?: AssetStatusModel;
  assetCategories?: AssetCategoryModel[];
  assetSim?: AssetSimCategoryModel | undefined;
}

interface AuditTrailModel {}

// * Site Model * //
export interface SiteModel {
  locations?: {
    gru?: LocationModel;
    unit?: LocationModel;
    site?: LocationModel;
  };
  id?: string;
  createdAt?: string;
  createdBy?: string;
  assets?: AssetModel[];
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  countryHSEHead?: UserModel;
  totalMappedAssets?: number;
  inventoryCreator?: UserModel;
  totalApprovedAssets?: number;
  auditTrail?: AuditTrailModel[];
}

// * Unit ( l7 location ) * //
// * Site ( l8 location ) * //
// * GRU ( l4/l5 location ) * //
// * Country HSE Head ( Asset 1st Level Approver ) * //
// * Inventory Creator ( Create Assets, Edit Assets ) * //

export interface AssetResponseModel {
  message: string;
  status: boolean;
  data: AssetModel;
}
export interface AssetsResponseModel {
  message: string;
  status: boolean;
  data: AssetModel[];
}

export interface SiteResponseModel {
  message: string;
  status: boolean;
  data: SiteModel;
}
export interface SitesResponseModel {
  message: string;
  status: boolean;
  data: { sites: SiteModel[]; categories: AssetCategoryModel[] };
}

export interface AssetInformation {
  id?: string;
  type?: string;
  title?: string;
  icon?: string;
  onlyParent?: boolean;
  onlyChild?: boolean;
  auto?: boolean;
}

export interface MasterAsset {
  id?: string;
  assetInformation?: AssetInformation;
  recommended?: AssetInformation[];
  others?: AssetInformation[];
  total_others?: number;
  total_recommended?: number;
}

export interface SelectedMasterAssetModel {
  id?: string;
  assetInformation?: AssetInformation;
  recommended?: AssetInformation[];
  others?: AssetInformation[];
  total_others?: number;
  total_recommended?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface MasterAssetResponseModel {
  message: string;
  status: boolean;
  data: MasterAsset[];
}
