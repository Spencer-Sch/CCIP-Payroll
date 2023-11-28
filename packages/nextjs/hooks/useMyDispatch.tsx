import type { MyDispatch } from "../components/dash-wind/app/store";
import { useDispatch } from "react-redux";

export const useMyDispatch = () => useDispatch<MyDispatch>();
