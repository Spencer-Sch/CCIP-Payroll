// import moment from "moment";
import { Address } from "viem";

export interface Employee {
  name: string;
  avatar: string;
  email: string;
  id: string;
  wallet: Address;
  role: string;
  joinedOn: string;
  lastActive: string;
}
