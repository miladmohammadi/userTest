import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import store from "./index";

const rootReducer = combineReducers({
  authSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
