import { createAction, props } from "@ngrx/store";
import { AssetsModel, PlantsModel } from "../models/plant.model";

export const ADD_PLANT = createAction(
  "ADD_PLANT",
  (plant: PlantsModel) => plant,
);

export const UPDATE_PLANT = createAction(
  "UPDATE_PLANT",
  (plant: PlantsModel) => ({ plant }),
);

export const ADD_PLANTS = createAction(
  "ADD_PLANTS",
  (plants: PlantsModel[]) => ({ plants }),
);

export const UPDATE_PLANTS = createAction(
  "UPDATE_PLANTS",
  (plant: PlantsModel) => ({ plant }),
);

export const ADD_ASSETS = createAction(
  "ADD_ASSETS",
  (assets: AssetsModel[]) => ({ assets }),
);

export const UPDATE_ASSET = createAction(
  "UPDATE_ASSET",
  (asset: AssetsModel) => ({ asset }),
);

export const ADD_ASSET = createAction("ADD_ASSET", (asset: AssetsModel) => ({
  asset,
}));
