// import { useEffect, useState } from "react";
// import moment from "moment";
import { useState } from "react";
// import { EMPLOYEES } from "~~/components/dash-wind/utils/dummyData";
import { Employee } from "../../types/Employee";
import { useMyDispatch } from "~~/components/dash-wind/app/store";
import InputText from "~~/components/dash-wind/components/Input/InputText";
import TextAreaInput from "~~/components/dash-wind/components/Input/TextAreaInput";
import ToggleInput from "~~/components/dash-wind/components/Input/ToggleInput";
import { showNotification } from "~~/components/dash-wind/features/common/headerSlice";
import { UpdateFormValues } from "~~/components/dash-wind/types/FormTypes";

function EditProfile({ employee, toggleEditMode }: { employee: Employee; toggleEditMode: () => void }) {
  const dispatch = useMyDispatch();
  const [loading, setLoading] = useState(false);

  // Call API to update profile settings changes
  const updateProfile = () => {
    setLoading(true);
    // update store
    window.setTimeout(() => {
      dispatch(showNotification({ message: "Profile Updated", status: 1 }));

      setLoading(false);
      toggleEditMode();
    }, 2000);
  };

  const updateFormValue = ({ updateType }: UpdateFormValues) => {
    console.log(updateType);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText labelTitle="Name" defaultValue={employee.name} updateFormValue={updateFormValue} />
        <InputText labelTitle="Email Id" defaultValue={employee.email} updateFormValue={updateFormValue} />
        <InputText labelTitle="Title" defaultValue={employee.role} updateFormValue={updateFormValue} />
        <InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue} />
        <TextAreaInput
          labelTitle="About"
          defaultValue="Doing what I love, part time traveller"
          updateFormValue={updateFormValue}
        />
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue} />
        <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue} />
        <ToggleInput
          updateType="syncData"
          labelTitle="Sync Data"
          defaultValue={true}
          updateFormValue={updateFormValue}
        />
      </div>

      <div className="mt-16">
        <button className={"btn btn-primary float-right " + (loading && "loading")} onClick={() => updateProfile()}>
          Update
        </button>
        <button className={"btn btn-ghost mr-5 float-right " + (loading && "loading")} onClick={() => toggleEditMode()}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditProfile;
