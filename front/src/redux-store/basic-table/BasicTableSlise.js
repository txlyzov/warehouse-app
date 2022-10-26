import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalCheckboxState: false,
  checkboxesSelected: 0,
  tableData: [],
};

const basicTableSlice = createSlice({
  name: "basicTable",
  initialState,
  reducers: {
    resetTableStorage: (state) => {
      state.globalCheckboxState = false;
      state.checkboxesSelected = 0;
      state.tableData = [];
    },
    setGlobalCheckboxState: (state, action) => {
      state.globalCheckboxState = action.payload;
      state.checkboxesSelected = action.payload ? state.tableData.length : 0;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCheckboxesSelected: (state, action) => {
      state.checkboxesSelected += action.payload ? 1 : -1;
      state.checkboxesSelected =
        state.checkboxesSelected > 0 ? state.checkboxesSelected : 0;
      state.checkboxesSelected =
        state.checkboxesSelected < state.tableData.length
          ? state.checkboxesSelected
          : state.tableData.length;
    },
  },
});

export const selectGlobalCheckboxState = (state) =>
  state.basicTable.globalCheckboxState;
export const selectCheckboxesSelected = (state) =>
  state.basicTable.checkboxesSelected;
export const selectTableData = (state) => state.basicTable.tableData;

export const {
  resetTableStorage,
  setGlobalCheckboxState,
  setCheckboxesSelected,
  setTableData,
} = basicTableSlice.actions;
export default basicTableSlice.reducer;
