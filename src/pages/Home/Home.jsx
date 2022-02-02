import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
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

const Home = () => {
  return (
    <DashboardWrapper>
      <div className="my-10">
        <div className="grid space-y-5 lg:space-y-0 grid-cols-1 lg:grid-cols-4 lg:gap-5">
          <div className="bg-white px-8 py-6 col-span-3 rounded-xl">
            <h2 className="text-lg mb-2">Cash Flow</h2>
            <hr className="border-[1px] my-5 opacity-50 border-dark-color bg-dark-color" />
            <div className="h-64 w-full">
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
              <hr />
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl">Two</div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Home;
