import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProvider } from "@web3auth/base";

export type AuthProvider = IProvider | null;

export interface AuthRootState {
  auth: {
    isConnected: boolean;
    provider: AuthProvider;
  };
}

interface AuthState {
  isConnected: boolean;
  provider: AuthProvider;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isConnected: false,
    provider: null as AuthProvider,
  },
  reducers: {
    setAuthProvider: (state: AuthState, action: PayloadAction<{ provider: AuthProvider }>) => {
      state.provider = action.payload.provider;
    },

    setIsConnected: (state: AuthState, action: PayloadAction<{ isConnected: boolean }>) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { setAuthProvider, setIsConnected } = authSlice.actions;

export default authSlice.reducer;
