import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  item: null,
};

const dataTransferSlice = createSlice({
  name: "dataTransfer",
  initialState,
  reducers: {
    resetDataTransferStorage: (state) => {
      state.type = null;
      state.item = null;
    },
    setType: (state, action) => {
      //   state.type = action.payload.type;
      //   state.item = action.payload.item;
      state.type = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const selectType = (state) => state.dataTransfer.type;
export const selectItem = (state) => state.dataTransfer.item;

export const { resetDataTransferStorage, setType } = dataTransferSlice.actions;
export default dataTransferSlice.reducer;
