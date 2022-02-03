import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Net Cash Flow",
      data: [
        3000, -2000, 2000, 1200, -600, 2500, 2000, 1000, -2500, 2000, 1800,
        1400,
      ],
      backgroundColor: "#1FB2BF",
      borderDash: [10, 5],
    },
  ],
};

const CashFlowChart = () => {
  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
      data={data}
    />
  );
};

export default CashFlowChart;
