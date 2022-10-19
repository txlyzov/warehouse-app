import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxState: false,
  tableContent: [{ index: 0, data: [], isSelected: false }],
};

const basicTableSlice = createSlice({
  name: "basicTable",
  initialState,
  reducers: {
    setCheckboxState: (state, action) => {
      state.checkboxState = action.payload;
    },
    setTableContentRedux: (state, action) => {
      state.tableContent = action.payload;
    },
  },
});

export const selectCheckboxState = (state) => state.basicTable.checkboxState;
export const selectTableContent = (state) => state.basicTable.tableContent;

export const { setCheckboxState, setTableContentRedux, setTableFieldRedux } =
  basicTableSlice.actions;
export default basicTableSlice.reducer;
