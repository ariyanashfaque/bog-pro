import {
  SiteModel,
  AssetModel,
  AssetCategoryModel,
} from "../models/asset.model";
import { createAction, props } from "@ngrx/store";

export const ADD_PLANT = createAction("ADD_PLANT", (plant: SiteModel) => plant);

export const UPDATE_PLANT = createAction(
  "UPDATE_PLANT",
  (plant: SiteModel) => ({ plant }),
);

export const ADD_PLANTS = createAction("ADD_PLANTS", (plants: SiteModel[]) => ({
  plants,
}));

export const UPDATE_PLANTS = createAction(
  "UPDATE_PLANTS",
  (plant: SiteModel) => ({ plant }),
);

export const ADD_ASSETS = createAction(
  "ADD_ASSETS",
  (assets: AssetModel[]) => ({ assets }),
);

export const UPDATE_ASSET = createAction(
  "UPDATE_ASSET",
  (asset: AssetModel) => ({ asset }),
);

export const ADD_CATEGORIES = createAction(
  "ADD_CATEGORIES",
  (categories: AssetCategoryModel[]) => ({ categories }),
);

export const ADD_ASSET = createAction("ADD_ASSET", (asset: AssetModel) => ({
  asset,
}));
