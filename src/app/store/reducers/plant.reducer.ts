import { createReducer, on } from "@ngrx/store";
import { PlantsModel, AssetsModel } from "../models/plant.model";
import { ADD_PLANTS, UPDATE_PLANT } from "../actions/plant.action";

const INITIAL_STATE: PlantsModel[] = [];

export const PlantsReducer = createReducer(
  INITIAL_STATE,
  on(ADD_PLANTS, (_, { plants }) => plants),
  on(UPDATE_PLANT, (state, { plant }) => {
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
  })
);
