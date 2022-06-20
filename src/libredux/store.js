import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epic";
import { appReducer } from "./app/app-reducer";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(epicMiddleware),
});

// !ATTENTION: this has to be in the last line
epicMiddleware.run(rootEpic);
