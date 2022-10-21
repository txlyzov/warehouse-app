import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "32424",
  JSX: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalTitle: (state, action) => {
      state.title = action.payload;
    },
    setModalContent: (state, action) => {
      state.JSX = action.payload;
    },
  },
});

export const selectModalTitle = (state) => state.modal.title;
export const selectModalContent = (state) => state.modal.JSX;

export const { setModalTitle, setModalContent } = modalSlice.actions;
export default modalSlice.reducer;
