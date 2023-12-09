import { useEffect, useState } from "react";
import Payroll from "../../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { setIsLoading } from "../employeesSlice";
import { useConnect, useContractWrite } from "wagmi";
import { useMyDispatch } from "~~/components/dash-wind/app/store";
import { UpdateFormValues } from "~~/components/dash-wind/types/FormTypes";

interface props {
  closeModal: () => void;
}

const INITIAL_EMPLOYEE_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
  wallet: "",
  is_salary: null,
  pay_rate: 0,
};

const payrollAddress = process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS;
const payrollABI = Payroll.abi;

// function AddLeadModalBody({ closeModal, extraObject }) {
function AddEmployeeModalBody({ closeModal }: props) {
  const dispatch = useMyDispatch();

  const { connect, connectors, isSuccess: wagmiIsConnected } = useConnect();
  //   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeObj, setEmployeeObj] = useState(INITIAL_EMPLOYEE_OBJ);

  useEffect(() => {
    if (!wagmiIsConnected) connect({ connector: connectors[6] });
  }, [wagmiIsConnected]);

  const { isLoading, isSuccess, write } = useContractWrite({
    address: payrollAddress,
    abi: payrollABI,
    functionName: "addEmployee",
    args: [employeeObj.wallet, true, 1n],
    // args: [employeeObj.wallet, true, parseEther("0.000000000000052")],
    onSuccess(data: any) {
      console.log("addEmployee Data: ", data); //will data be the contract addresses?
      dispatch(setIsLoading({ value: false }));
    },
    onError(error: any) {
      console.error("addEmployee error: ", error); //error message
    },
  });

  useEffect(() => {
    if (isSuccess) {
      // const newEmployeeObj = {
      //   id: 7,
      //   // email: employeeObj.email,
      //   email: "alex@honeybadgerhr.com",
      //   wallet: employeeObj.wallet,
      //   // first_name: employeeObj.first_name,
      //   first_name: "Alex",
      //   // last_name: employeeObj.last_name,
      //   last_name: "Smith",
      //   avatar: "https://reqres.in/img/faces/1-image.jpg",
      //   is_salary: true,
      //   pay_rate: 52_000,
      // };
      // dispatch(addNewEmployee({ newEmployeeObj }));
      dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
      closeModal();
    }
  }, [isSuccess]);

  const saveNewEmployee = () => {
    // if (employeeObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
    // else if (employeeObj.email.trim() === "") return setErrorMessage("Email id is required!");
    // else if (employeeObj.wallet.trim() === "") return setErrorMessage("Wallet Address is required!");
    if (employeeObj.wallet.trim() === "") return setErrorMessage("Wallet Address is required!");
    else {
      dispatch(setIsLoading({ value: true }));
      write();

      // const newEmployeeObj = {
      //   id: 7,
      //   // email: employeeObj.email,
      //   email: "alex@honeybadgerhr.com",
      //   wallet: employeeObj.wallet,
      //   // first_name: employeeObj.first_name,
      //   first_name: "Alex",
      //   // last_name: employeeObj.last_name,
      //   last_name: "Smith",
      //   avatar: "https://reqres.in/img/faces/1-image.jpg",
      //   is_salary: true,
      //   pay_rate: 52_000,
      // };
      // dispatch(addNewEmployee({ newEmployeeObj }));
      // dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
      // closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setEmployeeObj({ ...employeeObj, [updateType]: value });
  };

  return (
    <>
      {/* <InputText
        type="text"
        defaultValue={employeeObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={employeeObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={employeeObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      /> */}

      <InputText
        type="text"
        defaultValue={employeeObj.wallet}
        updateType="wallet"
        containerStyle="mt-4"
        labelTitle="Wallet"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button disabled={isLoading} className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button disabled={isLoading} className="btn btn-primary px-6" onClick={() => saveNewEmployee()}>
          {isLoading ? <span className="loading text-primary loading-bars loading-md"></span> : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddEmployeeModalBody;
