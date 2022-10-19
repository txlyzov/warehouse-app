import { configureStore } from "@reduxjs/toolkit";
import basicTableSlice from "./basic-table/BasicTableSlise";

const reduxStore = configureStore({
  reducer: {
    basicTable: basicTableSlice,
  },
});

export default reduxStore;
