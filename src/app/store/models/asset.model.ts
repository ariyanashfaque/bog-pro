// * Asset Zone Model * //
interface AssetZoneModel {
  id: string;
  area: string;
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

// * Asset Approval Model * //
interface AssetSourceModel {
  sapSync: boolean;
  bulkUpload: boolean;
  manualCreation: boolean;
}

// * Asset Category Model * //
export interface AssetCategoryModel {
  order: number;
  isSelected?: boolean;
  categoryType?: string;
  categoryTitle?: string;
}

// * Asset Silo Category Model * //
interface AssetSimCategoryModel {
  wallThickness: string;
  storedMaterial: string;
  wallThicknessUnit: number;
  wallThicknessKnown: boolean;
}

// * Asset Info Model * //
interface AssetInfoModel {
  name: string;
  sapId: string;
  status: string;
  assetType: string;
  costCenter: string;
  zone: AssetZoneModel;
  assetParentType: string;
  images: AssetImageModel[];
}

export interface DraftEngineerAssetStatus {
  assetPendingForApproval: boolean;
  assetRejectedByApprover: boolean;
  assetRegistrationPending: boolean;
}
export interface RegisteredEngineerAssetStatus {
  assetDecommissioned: boolean;
  assetDemolishRequested: boolean;
  assetPendingForApproval: boolean;
  assetDecommissionedRequested: boolean;
}
export interface DraftApproverAssetStatus {
  assetApproved: false;
  assetRejected: false;
  assetApprovalPending: true;
}
export interface RegisteredApproverAssetStatus {
  assetDemolishedPending: false;
  assetDemolitionApproved: false;
  assetDemolitionRejected: false;
  assetDecommissionRejected: false;
  assetDecommissionApproved: false;
  assetDecommissionedPending: false;
}

export interface AssetStatusModel {
  role: string;
  isDraft: boolean;
  isRegistered: boolean;
  status: {
    assetInDraft?: boolean;
    assetApproved?: boolean;
    assetRejected?: boolean;
    assetDecommissioned?: boolean;
    assetApprovalPending?: boolean;
    assetDemolishRequested?: boolean;
    assetDemolishedPending?: boolean;
    assetPendingForApproval?: boolean;
    assetDemolitionApproved?: boolean;
    assetDemolitionRejected?: boolean;
    assetRejectedByApprover?: boolean;
    assetRegistrationPending?: boolean;
    assetDecommissionRejected?: boolean;
    assetDecommissionApproved?: boolean;
    assetDecommissionedPending?: boolean;
    assetDecommissionedRequested?: boolean;
  };
}
export interface AssetMappedStatusModel {
  assetInDraft?: boolean;
  assetApproved?: boolean;
  assetRejected?: boolean;
  assetDecommissioned?: boolean;
  assetApprovalPending?: boolean;
  assetDemolishRequested?: boolean;
  assetDemolishedPending?: boolean;
  assetPendingForApproval?: boolean;
  assetDemolitionApproved?: boolean;
  assetDemolitionRejected?: boolean;
  assetRejectedByApprover?: boolean;
  assetRegistrationPending?: boolean;
  assetDecommissionRejected?: boolean;
  assetDecommissionApproved?: boolean;
  assetDecommissionedPending?: boolean;
  assetDecommissionedRequested?: boolean;
}

// * Asset Model * //
export interface AssetModel {
  id?: string;
  assetInfo?: AssetInfoModel;
  assetSource?: AssetSourceModel;
  assetStatus?: AssetStatusModel[];
  assetSim?: AssetSimCategoryModel;
  assetCategories?: AssetCategoryModel[];
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
