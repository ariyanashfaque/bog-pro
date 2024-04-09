import {
  ADD_ASSET,
  ADD_CATEGORIES,
  ADD_PLANT,
  ADD_PLANTS,
  UPDATE_ASSET,
  UPDATE_PLANT,
  UPDATE_PLANTS,
} from "../actions/asset.action";
import { createReducer, on } from "@ngrx/store";
import { AssetCategoryModel, SiteModel } from "../models/asset.model";

const INITIAL_STATE: SiteModel[] = [];
const INITIAL_STATE_PLANT: SiteModel = {};
const INITIAL_STATE_CATEGORIES: AssetCategoryModel[] = [];

export const PlantReducer = createReducer(
  INITIAL_STATE_PLANT,
  on(ADD_PLANT, (_, plant) => plant),
  on(UPDATE_PLANT, (state, { plant }) => ({ ...state, ...plant })),
  on(ADD_ASSET, (state, { asset }) => {
    state?.assets?.push(asset);
    return { ...state, assets: state?.assets };
  }),
  on(UPDATE_ASSET, (state, { asset }) => {
    const assets = state?.assets?.map((prevAsset) => {
      if (prevAsset?.id === asset?.id) {
        prevAsset = { ...prevAsset, ...asset };
      }
      return prevAsset;
    });
    return { ...state, assets: assets };
  }),
);

export const CategoriesReducer = createReducer(
  INITIAL_STATE_CATEGORIES,
  on(ADD_CATEGORIES, (_, { categories }) => categories),
);

export const PlantsReducer = createReducer(
  INITIAL_STATE,
  on(ADD_PLANTS, (_, { plants }) => plants),
  on(UPDATE_PLANTS, (state, { plant }) => {
    let plants: SiteModel[] = [];
    if (state) {
      plants = state.map((statePlant) => {
        if (statePlant.id === plant.id) {
          statePlant = { ...plant, ...statePlant };
        }
        return statePlant;
      });
    }
    return plants;
  }),
);
