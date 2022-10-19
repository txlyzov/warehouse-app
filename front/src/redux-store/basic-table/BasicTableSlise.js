import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxState: false,
};

const basicTableSlice = createSlice({
  name: "basicTable",
  initialState,
  reducers: {
    setCheckboxState: (state, action) => {
      state.checkboxState = action.payload;
    },
  },
});

export const selectCheckboxState = (state) => state.basicTable.checkboxState;

export const { setCheckboxState } = basicTableSlice.actions;
export default basicTableSlice.reducer;
