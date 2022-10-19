import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxState: false,
  tableData: [{ index: 0, data: [], isSelected: false }],
};

const basicTableSlice = createSlice({
  name: "basicTable",
  initialState,
  reducers: {
    setCheckboxState: (state, action) => {
      state.checkboxState = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const selectCheckboxState = (state) => state.basicTable.checkboxState;
export const selectTableData = (state) => state.basicTable.tableData;

export const { setCheckboxState, setTableData } = basicTableSlice.actions;
export default basicTableSlice.reducer;
