import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import basicTableSlice from "./basic-table/BasicTableSlise";
import modalSlice from "./modal/ModalSlice";

const reduxStore = configureStore({
  reducer: {
    basicTable: basicTableSlice,
    modal: modalSlice,
  },
  middleware: [thunk],
});

export default reduxStore;
