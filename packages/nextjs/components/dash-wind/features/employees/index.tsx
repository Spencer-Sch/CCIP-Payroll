/* eslint-disable @next/next/no-img-element */
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";
import TitleCard from "../../components/Cards/TitleCard";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
// import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";

/*-------------------------------------*/
// Kaz & Trevor
// uncomment
// import { useContractRead } from "wagmi";

/*-------------------------------------*/
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {
  /*MyState,*/
  useMyDispatch,
  /*useMySelector*/
} from "~~/components/dash-wind/app/store";
import { EMPLOYEES } from "~~/components/dash-wind/utils/dummyData";

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
// uncomment
// const chainId = process.env.NEXT_PUBLIC_TARGET_LOCAL_CHAIN
//   ? process.env.NEXT_PUBLIC_LOCAL_CHAIN_ID
//   : process.env.NEXT_PUBLIC_TESTNET_CHAIN_ID;
/*-------------------------------------*/

function Employees() {
  /*-------------------------------------*/
  // Kaz & Trevor
  // dummy employee data
  const [employees] = useState(EMPLOYEES);
  /*-------------------------------------*/
  // const {} = useMySelector((state: MyState) => state.employees);
  const dispatch = useMyDispatch();

  const router = useRouter();

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

  // uncomment below
  // const {
  //   data: salariedEmployeeAddresses, // address[]
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollContractAbi,
  //   functionName: "getSalariedEmployees",
  //   chainId: Number(chainId),
  // });

  // const {
  //   data: hourlyEmployeeAddresses, // address[]
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollContractAbi,
  //   functionName: "getHourlyEmployees",
  //   chainId: Number(chainId),
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

  const deleteCurrentLead = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, index: number) => {
    /*-------------------------------------*/
    // Kaz & Trevor
    // this function will be responsible for deleting an employee
    /*-------------------------------------*/
    e.stopPropagation();

    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this employee?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      }),
    );
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
            <tbody>
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
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Employees;
