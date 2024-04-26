import { MasterAsset } from "./asset.model";

export interface AssetZoneModel {
  id?: string;
  area?: MarkerModel;
  selectedAsset?: MasterAsset;
}

export class MarkerModel {
  lng: number;
  lat: number;
}
