import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";

// import axios from "axios";

export type Employee = {
  id: number;
  email: string;
  wallet: Address;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface EmployeeRootState {
  leads: {
    isLoading: boolean;
    employees: Employee[];
  };
}

interface EmployeeState {
  isLoading: boolean;
  employees: Employee[];
}

// export const getLeadsContent = createAsyncThunk("/leads/content", async () => {
//   const response = await axios.get("/api/users?page=2", {});
//   return response.data;
// });

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    isLoading: false,
    employees: [] as Employee[],
  },
  reducers: {
    addNewEmployee: (
      state: EmployeeState,
      action: PayloadAction<{
        newEmployeeObj: {
          id: number;
          email: string;
          wallet: Address;
          first_name: string;
          last_name: string;
          avatar: string;
        };
      }>,
    ) => {
      const { newEmployeeObj } = action.payload;
      state.employees = [...state.employees, newEmployeeObj];
    },

    deleteEmployee: (state: EmployeeState, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.employees.splice(index, 1);
    },
  },

  // extraReducers: (builder: ActionReducerMapBuilder<LeadState>) => {
  //   builder.addCase(getLeadsContent.pending, (state: LeadState) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(getLeadsContent.fulfilled, (state: LeadState, action: PayloadAction<Lead[]>) => {
  //     state.leads = action.payload;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(getLeadsContent.rejected, (state: LeadState) => {
  //     state.isLoading = false;
  //   });
  // },
});

export const { addNewEmployee, deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
