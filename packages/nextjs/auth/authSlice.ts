import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthRootState {
  auth: {
    isConnected: boolean;
    isAdmin: boolean;
  };
}

interface AuthState {
  isConnected: boolean;
  isAdmin: boolean;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isConnected: false,
    isAdmin: false,
  },
  reducers: {
    setIsConnected: (state: AuthState, action: PayloadAction<{ isConnected: boolean }>) => {
      state.isConnected = action.payload.isConnected;
    },

    setIsAdmin: (state: AuthState, action: PayloadAction<{ isAdmin: boolean }>) => {
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setIsConnected, setIsAdmin } = authSlice.actions;

export default authSlice.reducer;
