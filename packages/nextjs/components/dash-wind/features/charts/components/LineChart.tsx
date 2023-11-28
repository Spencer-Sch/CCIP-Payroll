import TitleCard from "../../../components/Cards/TitleCard";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function LineChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as "top" | "bottom" | "left" | "right" | "chartArea",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "MAU",
        data: labels.map(() => {
          return Math.random() * 100 + 500;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <TitleCard title={"Montly Active Users (in k)"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
