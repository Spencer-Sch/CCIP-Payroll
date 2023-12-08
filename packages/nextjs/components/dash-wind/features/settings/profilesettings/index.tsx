// import { useEffect, useState } from "react";
//import Payroll from "../../../../../hardhat/artifacts/contracts/Payroll.sol/Payroll.json";
import TitleCard from "../../../components/Cards/TitleCard";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToggleInput from "../../../components/Input/ToggleInput";
import { UpdateFormValues } from "../../../types/FormTypes";
import { showNotification } from "../../common/headerSlice";
// uncomment
//import { useContractWrite } from "wagmi";
// import moment from "moment";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

function ProfileSettings() {
  const dispatch = useMyDispatch();

  // Call API to update profile settings changes
  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  //@todo add button for employee to update wallet address
  // from payroll: function changePrimaryWalletAddress(address _oldAddress, address _newAddress) public onlyEmployee {}
  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollABI,
  //   functionName: "changePrimaryWalletAddress",
  //   args: [oldAddress, newAddress],
  // });

  //@todo add button/form/someway for employee to update their payment splits, which chains how much. Might want to be in Employee and Company dashboards?
  // from payroll:  function setPaymentSplits(address _employeeAddress, uint8[5] calldata _paySplitPercentages) public onlyEmployeeOrOwner {}
  // payment splits [0] = native chain, [1] = ethereum, [2] = optismium, [3] = avlanche, [4] = binance
  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: process.env.NEXT_PUBLIC_PAYROLL_CONTRACT_ADDRESS,
  //   abi: payrollABI,
  //   functionName: "setPaymentSplits",
  //   args: [employeeAddress, paySplitPercentages/**This needs to be an array with length of 5 */],
  // });

  const updateFormValue = ({ updateType }: UpdateFormValues) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText labelTitle="Name" defaultValue="Alex" updateFormValue={updateFormValue} />
          <InputText labelTitle="Email Id" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue} />
          <InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue} />
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
          <button className="btn btn-primary float-right" onClick={() => updateProfile()}>
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
