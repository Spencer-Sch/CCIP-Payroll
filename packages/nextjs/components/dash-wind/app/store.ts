import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import { Reducer, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

interface CombinedReducer {
  header: Reducer<{
    pageTitle: string;
    noOfNotifications: number;
    newNotificationMessage: string;
    newNotificationStatus: number;
  }>;
  rightDrawer: Reducer<{
    header: string;
    isOpen: boolean;
    bodyType: string;
    extraObject: Record<string, any>;
  }>;
  modal: Reducer<{
    title: string;
    isOpen: boolean;
    bodyType: string;
    size: string;
    extraObject: Record<string, any>;
  }>;
  lead: Reducer<{
    isLoading: boolean;
    leads: never[];
  }>;
}

const combinedReducer: CombinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
};

// export default configureStore({
//   reducer: combinedReducer,
// });
const store = configureStore({
  reducer: combinedReducer,
});

// const makeStore = context => store;
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type MyDispatch = typeof store.dispatch;
