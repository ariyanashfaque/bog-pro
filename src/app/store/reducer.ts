import { ActionReducerMap } from "@ngrx/store";
import { UserModel } from "./models/user.model";
import { PlantsModel } from "./models/plant.model";
import { UserReducer } from "./reducers/user.reducer";
import { PlantReducer, PlantsReducer } from "./reducers/plant.reducer";
export interface StoreState {
  user: UserModel;
  plant: PlantsModel;
  plants: PlantsModel[];
}

export const Reducer: ActionReducerMap<StoreState> = {
  user: UserReducer,
  plant: PlantReducer,
  plants: PlantsReducer,
};
