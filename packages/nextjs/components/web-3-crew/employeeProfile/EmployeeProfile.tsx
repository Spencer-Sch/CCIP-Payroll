// import { useEffect, useState } from "react";
// import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import EditProfile from "./components/EditProfile";
import ViewProfile from "./components/ViewProfile";
// import { useMyDispatch } from "~~/components/dash-wind/app/store";
import TitleCard from "~~/components/dash-wind/components/Cards/TitleCard";
// import { showNotification } from "~~/components/dash-wind/features/common/headerSlice";
// import { UpdateFormValues } from "~~/components/dash-wind/types/FormTypes";
import { EMPLOYEES } from "~~/components/dash-wind/utils/dummyData";

const TopSideButtons = () => {
  const router = useRouter();
  const goBack = () => {
    router.push("/dapp/employees");
  };

  return (
    <div className="inline-block float-left">
      <button className="btn px-6 btn-sm normal-case btn-neutral" onClick={() => goBack()}>
        Back
      </button>
    </div>
  );
};

function EmployeeProfile({ id }: { id: string }) {
  const [editMode, setEditMode] = useState(false);
  // const dispatch = useMyDispatch();

  function getEmployee(id: string) {
    // Eventually: pull global employee state, filter, find, and pass into EditProfile & ViewProfile
    const employee = EMPLOYEES.filter(e => e.id === id)[0];
    return employee;
  }

  function toggleEditMode() {
    setEditMode(prev => !prev);
  }

  // const updateProfile = () => {
  //   dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  // };

  // const updateFormValue = ({ updateType }: UpdateFormValues) => {
  //   console.log(updateType);
  // };

  return (
    <>
      <TitleCard
        title="Employee Profile"
        topMargin="mt-2"
        TopSideButtons={editMode ? <></> : <TopSideButtons />}
        topSideButtonsLeft={true}
      >
        {editMode ? (
          <EditProfile employee={getEmployee(id)} toggleEditMode={toggleEditMode} />
        ) : (
          <ViewProfile employee={getEmployee(id)} toggleEditMode={toggleEditMode} />
        )}
      </TitleCard>
    </>
  );
}

export default EmployeeProfile;
