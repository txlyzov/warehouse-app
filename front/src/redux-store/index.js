import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import basicTableSlice from "./basic-table/BasicTableSlise";
import dataTransferSlice from "./data-transfer/DataTransferSlice";
import modalSlice from "./modal/ModalSlice";

const reduxStore = configureStore({
  reducer: {
    basicTable: basicTableSlice,
    dataTransfer: dataTransferSlice,
    modal: modalSlice,
  },
  middleware: [thunk],
});

export default reduxStore;
