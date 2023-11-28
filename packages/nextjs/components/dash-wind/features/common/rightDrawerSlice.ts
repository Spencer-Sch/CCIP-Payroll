import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RightDrawerRootState {
  rightDrawer: {
    header: string;
    isOpen: boolean;
    bodyType: string;
    extraObject: Record<string, any>;
  };
}

interface RightDrawerState {
  header?: string;
  isOpen?: boolean;
  bodyType: string;
  extraObject?: Record<string, any>;
}

export const rightDrawerSlice = createSlice({
  name: "rightDrawer",
  initialState: {
    header: "", // current  title state management
    isOpen: false, // right drawer state management for opening closing
    bodyType: "", // right drawer content management
    extraObject: {},
  },
  reducers: {
    openRightDrawer: (state: RightDrawerState, action: PayloadAction<RightDrawerState>) => {
      const { header, bodyType, extraObject } = action.payload;
      state.isOpen = true;
      state.bodyType = bodyType;
      state.header = header;
      state.extraObject = extraObject;
    },

    closeRightDrawer: (state: RightDrawerState) => {
      state.isOpen = false;
      state.bodyType = "";
      state.header = "";
      state.extraObject = {};
    },
  },
});

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions;

export default rightDrawerSlice.reducer;
