import { createAction } from "@ngrx/store";
import { UserModel } from "../models/user.model";

export const ADD_USER = createAction("ADD_USER", (user: UserModel) => ({
  user,
}));

export const UPDATE_USER = createAction("ADD_USER", (user: UserModel) => ({
  user,
}));
