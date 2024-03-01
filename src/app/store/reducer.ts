import {
  PlantReducer,
  PlantsReducer,
  CategoriesReducer,
} from "./reducers/plant.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { UserModel } from "./models/user.model";
import { UserReducer } from "./reducers/user.reducer";
import { CategoriesModel, PlantsModel } from "./models/plant.model";
export interface StoreState {
  user: UserModel;
  plant: PlantsModel;
  plants: PlantsModel[];
  categories: CategoriesModel[];
}

export const Reducer: ActionReducerMap<StoreState> = {
  user: UserReducer,
  plant: PlantReducer,
  plants: PlantsReducer,
  categories: CategoriesReducer,
};
