// import { useState } from "react";
import { useEffect, useState } from "react";
import Payroll from "../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { UpdateFormValues } from "../../types/FormTypes";
import { showNotification } from "../common/headerSlice";
// import AmountStats from "./components/AmountStats";
// import BarChart from "./components/BarChart";
// import DashboardStats from "./components/DashboardStats";
// import DashboardTopBar from "./components/DashboardTopBar";
// import DoughnutChart from "./components/DoughnutChart";
// import LineChart from "./components/LineChart";
// import PageStats from "./components/PageStats";
// import UserChannels from "./components/UserChannels";
import { useContractEvent, useContractWrite } from "wagmi";
// import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
// import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
// import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
// import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

// const statsData = [
//   { title: "New Users", value: "34.7k", icon: <UserGroupIcon className="w-8 h-8" />, description: "↗︎ 2300 (22%)" },
//   {
//     title: "Total Sales",
//     value: "$34,545",
//     icon: <CreditCardIcon className="w-8 h-8" />,
//     description: "Current month",
//   },
//   {
//     title: "Pending Leads",
//     value: "450",
//     icon: <CircleStackIcon className="w-8 h-8" />,
//     description: "50 in hot leads",
//   },
//   { title: "Active Users", value: "5.6k", icon: <UsersIcon className="w-8 h-8" />, description: "↙ 300 (18%)" },
// ];

// const chainId = process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN
//   ? process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
//   : process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;

const payrollABI = Payroll.abi;
const payrollAddress = process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS;

const INITIAL_PAYMENT_OBJ = {
  address: "",
  hours_worked: 0,
};

function Dashboard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentObj, setPaymentObj] = useState(INITIAL_PAYMENT_OBJ);
  const dispatch = useMyDispatch();

  // const updateDashboardPeriod = (newRange: DateValue) => {
  //   // Dashboard range changed, write code to refresh your values
  //   dispatch(
  //     showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }),
  //   );
  // };

  // paySingleEmployee args: address _employeeAddress, uint8 hoursWorked - will be 0 if salary
  const { isLoading, isSuccess, write } = useContractWrite({
    address: payrollAddress,
    abi: payrollABI,
    functionName: "paySingleEmployee",
    args: [paymentObj.address, paymentObj.hours_worked],
    onSuccess(data: any) {
      console.log("paySingleEmployee Data: ", data);
    },
    onError(data: any) {
      console.log("paySingleEmployee Error: ", data);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotification({ message: "Employee Paid!", status: 1 }));
    }
  }, [isSuccess]);

  useContractEvent({
    address: payrollAddress,
    abi: payrollABI,
    eventName: "SingleEmployeePaid",
    // listener(log: { args: { _amount: bigint; _employeeAddress: string } }[]) {
    listener(log: any) {
      console.log("singleEmployeePaid log: ", log);

      const rootPaymentsObj: { payments: any[] } = {
        payments: [],
      };
      const paymentObj = {
        employeeAddress: log[0].args._employeeAddress,
        amount: log[0].args._amount,
      };
      rootPaymentsObj.payments.push(paymentObj);
      // console.log(`employee ${wallet} paid ${amount}`);
      // save to local storage...
      // const payments = localStorage.getItem("payments");
      console.log("session storage set payment: ", JSON.stringify(rootPaymentsObj));
      sessionStorage.setItem("payments", JSON.stringify(rootPaymentsObj));
      // if (payments) {
      //   console.log(
      //     "local storage set item 1: ",
      //     JSON.stringify(paymentObj),
      //   );
      // } else {
      //   console.log(
      //     "local storage set item 2: ",
      //     JSON.stringify([
      //       {
      //         employeeAddress: log[0].args._employeeAddress,
      //         amount: log[0].args._amount,
      //       },
      //     ]),
      //   );
      //   localStorage.setItem(
      //     "payments",
      //     JSON.stringify([
      //       {
      //         employeeAddress: log[0].args._employeeAddress,
      //         amount: log[0].args._amount,
      //       },
      //     ]),
      //   );
      // }
    },
  });

  function payEmployee() {
    if (paymentObj.address.trim() === "") return setErrorMessage("Wallet Address is required!");
    else {
      write();
    }
  }

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setPaymentObj({ ...paymentObj, [updateType]: value });
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}

      {/** ---------------------- Different stats content 1 ------------------------- */}
      {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6"> */}
      {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div> */}

      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-1/3">
          <InputText
            type="text"
            defaultValue={paymentObj.address}
            updateType="address"
            containerStyle="mt-4"
            labelTitle="Employee Address"
            updateFormValue={updateFormValue}
          />
          {errorMessage && <ErrorText styleClass="">{errorMessage}</ErrorText>}
          <button disabled={isLoading} className="mt-5 btn btn-primary btn-block px-6" onClick={() => payEmployee()}>
            {isLoading ? <span className="loading text-primary loading-bars loading-md"></span> : "Pay Employee"}
          </button>
        </div>
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div> */}

      {/** ---------------------- Different stats content 2 ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div> */}

      {/** ---------------------- User source channels table  ------------------------- */}

      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <DoughnutChart />
      </div> */}
    </>
  );
}

export default Dashboard;
