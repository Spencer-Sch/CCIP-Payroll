import { useState } from "react";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewEmployee } from "../employeesSlice";
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
};

// function AddLeadModalBody({ closeModal, extraObject }) {
function AddEmployeeModalBody({ closeModal }: props) {
  const dispatch = useMyDispatch();
  //   const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeObj, setEmployeeObj] = useState(INITIAL_EMPLOYEE_OBJ);

  const saveNewLead = () => {
    if (employeeObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
    else if (employeeObj.email.trim() === "") return setErrorMessage("Email id is required!");
    else if (employeeObj.wallet.trim() === "") return setErrorMessage("Wallet Address is required!");
    else {
      const newEmployeeObj = {
        id: 7,
        email: employeeObj.email,
        wallet: employeeObj.wallet,
        first_name: employeeObj.first_name,
        last_name: employeeObj.last_name,
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      };
      dispatch(addNewEmployee({ newEmployeeObj }));
      dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }: UpdateFormValues) => {
    setErrorMessage("");
    setEmployeeObj({ ...employeeObj, [updateType]: value });
  };

  return (
    <>
      <InputText
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
      />

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
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddEmployeeModalBody;
