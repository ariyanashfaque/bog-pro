import { MasterAsset } from "./asset.model";

export interface AssetZoneModel {
  id?: string;
  area?: MarkerModel;
  selectedAsset?: string | MasterAsset;
}

export class MarkerModel {
  lng: number;
  lat: number;
}
