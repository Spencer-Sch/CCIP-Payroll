import { Employee } from "../../types/Employee";
import ProfileAttribute from "./ProfileAttribute";

// import { useMyDispatch } from "~~/components/dash-wind/app/store";
// import { showNotification } from "~~/components/dash-wind/features/common/headerSlice";
// import { UpdateFormValues } from "~~/components/dash-wind/types/FormTypes";

function ViewProfile({ employee, toggleEditMode }: { employee: Employee; toggleEditMode: () => void }) {
  // const dispatch = useMyDispatch();

  // Call API to update profile settings changes
  // const updateProfile = () => {
  //   dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  // };

  // const updateFormValue = ({ updateType }: UpdateFormValues) => {
  //   console.log(updateType);
  // };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileAttribute labelTitle="Name" value={employee.name} />
        <ProfileAttribute labelTitle="Email" value={employee.email} />
        <ProfileAttribute labelTitle="Title" value={employee.role} />
        <ProfileAttribute labelTitle="Place" value="California" />
        <ProfileAttribute labelTitle="About" value="Doing what I love, part time traveller" />
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileAttribute labelTitle="Language" value="English" />
        <ProfileAttribute labelTitle="Timezone" value="IST" />
      </div>

      <div className="mt-16">
        <button className="btn btn-primary float-right" onClick={() => toggleEditMode()}>
          Edit Profile
        </button>
      </div>
    </>
  );
}

export default ViewProfile;
