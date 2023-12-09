/* eslint-disable @next/next/no-img-element */
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Payroll from "../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";
// import Image from "next/image";
import TitleCard from "../../components/Cards/TitleCard";
import ErrorText from "../../components/Typography/ErrorText";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
// import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
// import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import { useContractEvent, useContractRead, useContractWrite } from "wagmi";

/*-------------------------------------*/
// // Kaz & Trevor
// // uncomment
// import { useContractRead } from "wagmi";
// import Payroll from "../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";

/*-------------------------------------*/
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
// import { useMyDispatch } from "~~/components/dash-wind/app/store";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";
import { EMPLOYEES as dummyEmployees } from "~~/components/dash-wind/utils/dummyData";

const TopSideButtons = () => {
  const dispatch = useMyDispatch();

  const openAddNewLeadModal = () => {
    dispatch(openModal({ title: "Add New Employee", bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW }));
  };

  return (
    <div className="inline-block float-right">
      <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>
        Add New
      </button>
    </div>
  );
};

/*-------------------------------------*/
// Kaz & Trevor
// uncomment @todo
// const chainId = process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN
//   ? process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
//   : process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;

// const payrollABI = Payroll.abi;
/*-------------------------------------*/

const payrollAddress = process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS;
const payrollABI = Payroll.abi;
const chainId = //process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN ?
  //process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
  //:
  process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;

function Employees() {
  /*-------------------------------------*/
  // Kaz & Trevor
  // dummy employee data
  // const [dummyEmployees] = useState(EMPLOYEES);
  /*-------------------------------------*/

  const { isLoading: isAddingNewEmployee } = useMySelector((state: MyState) => state.employees);
  // const dispatch = useMyDispatch();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [isRemovingEmpAndFetching, setIsRemovingEmpAndFetching] = useState(false);
  const [empAddiToRemove, setEmpAddiToRemove] = useState<string | null>(null);

  /*-------------------------------------*/
  // Kaz & Trevor
  // Component responsible for displaying table of employees on the employer dashboard
  /** NOTE
   * Employee addresses will be pulled from contract
   * Addresses used to find employee data object in DB (dummy data right now)
   * One array of all employees will be created
   * This array will be saved in global state
   * This will allow for access to employee data in other components: EmployeeProfile,
   */

  // // uncomment below @todo
  const {
    data: salariedEmployeeAddresses, // address[]
    // isError,
    isLoading: isGettingSalariedEmployees,
    isSuccess: getSalariedEmployeesSuccess,
    refetch: refetchSalariedEmployees,
  }: {
    data: string[] | undefined;
    isError: boolean | undefined;
    isSuccess: boolean | undefined;
    isLoading: boolean | undefined;
    refetch: () => Promise<any>;
  } = useContractRead({
    address: payrollAddress,
    abi: payrollABI,
    functionName: "getSalariedEmployees",
    chainId: Number(chainId),
    onSuccess(data) {
      console.log("salariedEmployeeAddresses: ", data);
    },
    onError(error) {
      console.error("getSalariedEmployees error: ", error);
      setErrorMsg("getSalariedEmployees error");
    },
  });

  useContractEvent({
    address: payrollAddress,
    abi: payrollABI,
    eventName: "EmployeeAdded",
    listener() {
      console.log("employee added! refetching employees...");
      refetchSalariedEmployees();
      // refetchSalariedEmployees().then(() => {
      //   if (getSalariedEmployeesSuccess) {
      //     setIsRemovingEmpAndFetching(false);
      //   }
      // });
    },
  });

  useContractEvent({
    address: payrollAddress,
    abi: payrollABI,
    eventName: "EmployeeFired",
    listener() {
      console.log("employee fired! refetching employees...");
      refetchSalariedEmployees().then(() => {
        if (getSalariedEmployeesSuccess) {
          setIsRemovingEmpAndFetching(false);
        }
      });
    },
  });

  const {
    // data,
    isLoading: isRemovingEmployee,
    // isSuccess: isEmployeeRemoved,
    write: removeEmployeeWrite,
  } = useContractWrite({
    address: payrollAddress,
    abi: payrollABI,
    functionName: "removeEmployee",
    args: [empAddiToRemove],
    onSuccess() {
      setEmpAddiToRemove(null);
      // refetchSalariedEmployees();
    },
    onError(error) {
      console.error("removeEmployee", error);
      setErrorMsg("removeEmployee error");
    },
  });
  // const {
  //   data: hourlyEmployeeAddresses, // address[]
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollABI,
  //   functionName: "getHourlyEmployees",
  //   chainId: Number(chainId),
  // });

  // // this will return a bool from contract as to if the address is an employee true = employee exists
  // const {
  //   data: isEmployee,
  //   // isError,
  //   // isLoading,
  // } = useContractRead({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollABI,
  //   functionName: "isEmployee",
  //   //@todo where do we need to get this address from?
  //   // figured we should check if an address is an employee
  //   // before owner/company is allwoed to add or delete
  //   args: [userAddress],
  //   chainId: Number(chainId),
  // });

  // // hook to set or change an employees salary if we need it, not necessary for stuff rn
  // // from Payroll: function setEmployeeSalary(address _employeeAddress, bool _isSalary, uint256 _payRate) external onlyOwner {}
  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollABI,
  //   functionName: "setEmployeeSalary",
  //   args: [employeeAddress, isSalary, payRate]
  // });

  // match each employee address with corresponding employee in dummy data
  // function getEmployeesFromDB() {
  // // ...
  // }
  /*-------------------------------------*/

  // useEffect(() => {
  //   dispatch(getLeadsContent());
  // }, [dispatch]);

  const getRoleComponent = (role: string) => {
    if (role === "Designer") return <div className="badge badge-secondary">{role}</div>;
    if (role === "Manager") return <div className="badge">{role}</div>;
    if (role === "Owner") return <div className="badge badge-primary">{role}</div>;
    if (role === "Developer") return <div className="badge badge-accent">{role}</div>;
    else return <div className="badge badge-ghost">{role}</div>;
  };

  useEffect(() => {
    if (empAddiToRemove !== null) {
      removeEmployeeWrite();
    }
  }, [empAddiToRemove]);

  const deleteCurrentEmployee = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    address: string,
    // index: number,
  ) => {
    e.stopPropagation();
    /*-------------------------------------*/
    // Kaz & Trevor @todo
    // this function will be responsible for deleting an employee
    // WAGMI HOOK
    /*-------------------------------------*/
    setEmpAddiToRemove(address);
    setIsRemovingEmpAndFetching(true);

    // dispatch(
    //   openModal({
    //     title: "Confirmation",
    //     bodyType: MODAL_BODY_TYPES.CONFIRMATION,
    //     extraObject: {
    //       message: `Are you sure you want to delete this employee?`,
    //       type: CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYEE_DELETE,
    //       index,
    //     },
    //   }),
    // );
  };

  function goToProfile(id: string) {
    router.push(`/dapp/employee/${id}`);
  }

  return (
    <>
      <TitleCard title="Active Employees" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Wallet</th>
                <th>Employee Id</th>
                <th>Joined On</th>
                <th>Role</th>
                <th>Last Active</th>
              </tr>
            </thead>
            {/* {!salariedEmployeeAddresses && isGettingSalariedEmployees ? ( */}
            {salariedEmployeeAddresses ? (
              <tbody>
                {salariedEmployeeAddresses?.map((a, k) => {
                  return (
                    <tr
                      key={k}
                      className="btn-ghost hover:cursor-pointer"
                      onClick={() => goToProfile(dummyEmployees[k].id)}
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img src={dummyEmployees[k].avatar} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{dummyEmployees[k].name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{dummyEmployees[k].email}</td>
                      <td>{a}</td>
                      <td>{dummyEmployees[k].id}</td>
                      <td>{dummyEmployees[k].joinedOn}</td>
                      <td>{getRoleComponent(dummyEmployees[k].role)}</td>
                      <td>{dummyEmployees[k].lastActive}</td>
                      <td>
                        <button
                          disabled={isRemovingEmployee}
                          className="btn btn-square btn-ghost"
                          onClick={e => deleteCurrentEmployee(e, a)}
                        >
                          {/* <button className="btn btn-square btn-ghost" onClick={e => deleteCurrentEmployee(e, a, k)}> */}
                          {isRemovingEmpAndFetching && empAddiToRemove === a ? (
                            <span className="loading loading-bars text-primary loading-sm"></span>
                          ) : (
                            <TrashIcon className="w-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <td>No employees yet...</td>
              </tbody>
            )}
            {isAddingNewEmployee || isGettingSalariedEmployees ? (
              <tbody className="">
                <td>
                  <span className="loading loading-bars text-primary loading-lg"></span>
                </td>
              </tbody>
            ) : null}
            {!salariedEmployeeAddresses && errorMsg ? (
              <tbody className="">
                <td>
                  <ErrorText styleClass="mt-16">{errorMsg}</ErrorText>
                </td>
              </tbody>
            ) : null}
            {/* <tbody>
              {employees.map((l, k) => {
                return (
                  <tr key={k} className="btn-ghost hover:cursor-pointer" onClick={() => goToProfile(l.id)}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.wallet}</td>
                    <td>{l.id}</td>
                    <td>{l.joinedOn}</td>
                    <td>{getRoleComponent(l.role)}</td>
                    <td>{l.lastActive}</td>
                    <td>
                      <button className="btn btn-square btn-ghost" onClick={e => deleteCurrentLead(e, k)}>
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody> */}
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Employees;
