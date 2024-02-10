import { createReducer, on } from "@ngrx/store";
import { UserModel } from "../models/user.model";
import { ADD_USER, UPDATE_USER } from "../actions/user.action";

const INITIAL_STATE: UserModel = {
  lastName: "",
  firstName: "",
  isLoading: false,
  isLoggedIn: false,
};

export const UserReducer = createReducer(
  INITIAL_STATE,
  on(UPDATE_USER, (state) => state),
  on(ADD_USER, (state) => state)
);
