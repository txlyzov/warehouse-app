import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import basicTableSlice from "./basic-table/BasicTableSlise";

const reduxStore = configureStore({
  reducer: {
    basicTable: basicTableSlice,
  },
  middleware: [thunk],
});

export default reduxStore;
