import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModalRootState {
  modal: {
    title: string;
    isOpen: boolean;
    bodyType: string;
    size: string;
    extraObject: Record<string, any>;
  };
}

interface ModalState {
  title?: string;
  isOpen?: boolean;
  bodyType?: string;
  size?: string;
  extraObject?: Record<string, any>;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    title: "", // current  title state management
    isOpen: false, // modal state management for opening closing
    bodyType: "", // modal content management
    size: "", // modal content management
    extraObject: {},
  },
  reducers: {
    openModal: (state: ModalState, action: PayloadAction<ModalState>) => {
      const { title, bodyType, extraObject, size } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.title = title;
      state.size = size || "md";
      state.extraObject = extraObject;
    },

    closeModal: (state: ModalState) => {
      state.isOpen = false;
      state.bodyType = "";
      state.title = "";
      state.extraObject = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
