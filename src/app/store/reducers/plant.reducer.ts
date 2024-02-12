import { createReducer, on } from "@ngrx/store";
import { PlantsModel, AssetsModel } from "../models/plant.model";
import {
  ADD_PLANT,
  ADD_PLANTS,
  UPDATE_PLANT,
  UPDATE_PLANTS,
} from "../actions/plant.action";

const INITIAL_STATE: PlantsModel[] = [];
const INITIAL_STATE_PLANT: PlantsModel = {};

export const PlantReducer = createReducer(
  INITIAL_STATE_PLANT,
  on(ADD_PLANT, (_, plant) => plant),
  on(UPDATE_PLANT, (state, { plant }) => ({ ...state, ...plant })),
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
