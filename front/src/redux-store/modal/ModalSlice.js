import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "32424",
  JSX: null,
  errorCase: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    resetModal: (state) => {
      state.title = null;
      state.JSX = null;
      state.errorCase = false;
    },
    setModalTitle: (state, action) => {
      state.title = action.payload;
    },
    setModalContent: (state, action) => {
      state.JSX = action.payload;
    },
    setErrorCase: (state) => {
      state.errorCase = true;
    },
  },
});

export const selectModalTitle = (state) => state.modal.title;
export const selectModalContent = (state) => state.modal.JSX;
export const selectErrorCase = (state) => state.modal.errorCase;

export const { resetModal, setModalTitle, setModalContent, setErrorCase } =
  modalSlice.actions;
export default modalSlice.reducer;
