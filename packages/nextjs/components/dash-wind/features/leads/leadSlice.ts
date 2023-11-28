import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Lead = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface LeadRootState {
  leads: {
    isLoading: boolean;
    leads: Lead[];
  };
}

interface LeadState {
  isLoading: boolean;
  leads: Lead[];
}

export const getLeadsContent = createAsyncThunk("/leads/content", async () => {
  const response = await axios.get("/api/users?page=2", {});
  return response.data;
});

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (
      state: LeadState,
      action: PayloadAction<{
        newLeadObj: {
          id: number;
          email: string;
          first_name: string;
          last_name: string;
          avatar: string;
        };
      }>,
    ) => {
      const { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state: LeadState, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.leads.splice(index, 1);
    },
  },

  extraReducers: (builder: ActionReducerMapBuilder<LeadState>) => {
    builder.addCase(getLeadsContent.pending, (state: LeadState) => {
      state.isLoading = true;
    });
    builder.addCase(getLeadsContent.fulfilled, (state: LeadState, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getLeadsContent.rejected, (state: LeadState) => {
      state.isLoading = false;
    });
  },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
