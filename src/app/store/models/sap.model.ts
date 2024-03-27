export interface ERPSyncModel {
  id?: string;
  name?: string;
  sapId: string;
  status?: string;
  assetId?: string;
  location?: string;
  description?: string;
  structureType?: string;
  materialType?: string[];
  constructionYear?: number;
}
export interface FieldMapModel {
  // sapId?: string;
  // locationCode?: string;
  // location?: string;
  // functionalLocationCode?: string;
  // functionalLocationDescription?: string;
  // costCenterCode?: string;
  // costCenterDescription?: string;
  // hierarchyAreaCode?: string;
  // hierarchyAreaDescription?: string;
  // name?: string;
  // status?: string;
  // assetType?: string;
  name: string;
  description: string;
}

export interface SAPActivityLogModel {
  id?: string;
  action?: string; // CREATED | UPDATED | DELETED
  updatedAt?: string;
  updatedBy?: string;
  date?: string;
  time?: string;
  size?: string;
}

export interface SAPconfigurationModel {
  id?: string;
  token?: string;
  gruStatus?: string;
  gruName?: string;
  syncType?: string;
  protocol?: string;
  createdAt?: string;
  // fields?: FieldMapModel[];
  sapId?: string;
  locationCode?: string;
  location?: string;
  functionalLocationCode?: string;
  functionalLocationDescription?: string;
  costCenterCode?: string;
  costCenterDescription?: string;
  hierarchyAreaCode?: string;
  hierarchyAreaDescription?: string;
  name?: string;
  status?: string;
  assetType?: string;
  log?: SAPActivityLogModel[];
}

export interface SAPResponse {
  message: string;
  status: boolean;
  data: SAPconfigurationModel;
}
export interface SAPConfigurationResponse {
  message: string;
  status: boolean;
  data: SAPconfigurationModel[];
}
