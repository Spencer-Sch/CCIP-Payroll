import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HeaderRootState {
  header: {
    pageTitle: string;
    noOfNotifications: number;
    newNotificationMessage: string;
    newNotificationStatus: number;
  };
}

export interface HeaderState {
  pageTitle: string;
  noOfNotifications: number;
  newNotificationMessage: string;
  newNotificationStatus: number;
}

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    pageTitle: "Home", // current page title state management
    noOfNotifications: 15, // no of unread notifications
    newNotificationMessage: "", // message of notification to be shown
    newNotificationStatus: 1, // to check the notification type -  success/ error/ info
  },
  reducers: {
    setPageTitle: (state: HeaderState, action: PayloadAction<{ title: string }>) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state: HeaderState) => {
      state.newNotificationMessage = "";
    },

    showNotification: (state: HeaderState, action: PayloadAction<{ message: string; status: number }>) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } = headerSlice.actions;

export default headerSlice.reducer;
