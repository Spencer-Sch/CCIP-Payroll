// import { useEffect } from "react";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import { ModalRootState, closeModal } from "../features/common/modalSlice";
import AddEmployeeModalBody from "../features/employees/components/AddEmployeeModalBody";
// import AddLeadModalBody from "../features/leads/components/AddLeadModalBody";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { MyState, useMyDispatch, useMySelector } from "~~/components/dash-wind/app/store";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title }: ModalRootState["modal"] = useMySelector(
    (state: MyState) => state.modal,
  );
  const dispatch = useMyDispatch();

  const close = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              // [MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddLeadModalBody closeModal={close} extraObject={extraObject} />,
              // [MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddLeadModalBody closeModal={close} />,
              [MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW]: <AddEmployeeModalBody closeModal={close} />,
              [MODAL_BODY_TYPES.CONFIRMATION]: <ConfirmationModalBody extraObject={extraObject} closeModal={close} />,
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
