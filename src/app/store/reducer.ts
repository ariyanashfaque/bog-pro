import { PlantsModel } from "./models/plant.model";
import { UserModel } from "./models/user.model";
import { PlantsReducer } from "./reducers/plant.reducer";
import { UserReducer } from "./reducers/user.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface StoreState {
  user: UserModel;
  plants: PlantsModel[];
}

export const Reducer: ActionReducerMap<StoreState> = {
  user: UserReducer,
  plants: PlantsReducer,
};
