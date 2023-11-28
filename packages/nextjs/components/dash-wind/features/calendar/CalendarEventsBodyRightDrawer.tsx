import { getTheme } from "../../components/CalendarView/util";
import { CalendarMore } from "../../types/CalendarTypes";

interface props {
  filteredEvents?: CalendarMore[];
  closeRightDrawer?: () => void;
}

function CalendarEventsBodyRightDrawer({ filteredEvents }: props) {
  return (
    <>
      {filteredEvents?.map((e, k) => {
        return (
          <div key={k} className={`grid mt-3 card  rounded-box p-3 ${getTheme(e.theme) || ""}`}>
            {e.title}
          </div>
        );
      })}
    </>
  );
}

export default CalendarEventsBodyRightDrawer;
