import {
  ADD_ASSET,
  ADD_PLANT,
  ADD_PLANTS,
  UPDATE_ASSET,
  UPDATE_PLANT,
  UPDATE_PLANTS,
} from "../actions/plant.action";
import { createReducer, on } from "@ngrx/store";
import { PlantsModel } from "../models/plant.model";

const INITIAL_STATE: PlantsModel[] = [];
const INITIAL_STATE_PLANT: PlantsModel = {};

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
        prevAsset = asset;
      }
      return prevAsset;
    });
    return { ...state, assets: assets };
  }),
);

export const PlantsReducer = createReducer(
  INITIAL_STATE,
  on(ADD_PLANTS, (_, { plants }) => plants),
  on(UPDATE_PLANTS, (state, { plant }) => {
    let plants: PlantsModel[] = [];
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
