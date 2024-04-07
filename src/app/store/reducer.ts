import {
  PlantReducer,
  PlantsReducer,
  CategoriesReducer,
} from "./reducers/asset.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { UserModel } from "./models/user.model";
import { UserReducer } from "./reducers/user.reducer";
import { AssetCategoryModel, SiteModel } from "./models/asset.model";
export interface StoreState {
  user: UserModel;
  plant: SiteModel;
  plants: SiteModel[];
  categories: AssetCategoryModel[];
}

export const Reducer: ActionReducerMap<StoreState> = {
  user: UserReducer,
  plant: PlantReducer,
  plants: PlantsReducer,
  categories: CategoriesReducer,
};
