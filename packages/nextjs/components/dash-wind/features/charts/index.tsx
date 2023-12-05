import { useState } from "react";
import { DateValue } from "../../types/DateTypes";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import ScatterChart from "./components/ScatterChart";
import StackBarChart from "./components/StackBarChart";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

function Charts() {
  const [dateValue, setDateValue] = useState<DateValue | null>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDatePickerValueChange = (newValue: DateValueType, e?: HTMLInputElement | null | undefined) => {
    if (newValue !== null) {
      // console.log("newValue:", newValue);
      setDateValue(newValue);
    }
  };

  return (
    <>
      <Datepicker
        containerClassName="w-72"
        value={dateValue}
        // wrapperClassName=""
        inputClassName="input input-bordered w-72"
        popoverDirection={"down"}
        toggleClassName="invisible"
        onChange={handleDatePickerValueChange}
        showShortcuts={true}
        primaryColor={"rose"}
      />
      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <StackBarChart />
        <BarChart />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart />
        <PieChart />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <ScatterChart />
        <LineChart />
      </div>
    </>
  );
}

export default Charts;
