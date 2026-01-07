import { configureStore } from "@reduxjs/toolkit";
import keyPairReducer from "./keyPair/keyPairSlice";

export const store = configureStore({
  reducer: {
    keypair: keyPairReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;