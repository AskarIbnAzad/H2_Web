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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export function BarChart({ chartData, chartLabel, xKey, yKey = "count" }) {
  // Extract dynamic labels and counts based on the keys provided
  const labels = chartData?.map((item) => item?.[xKey]);
  const counts = chartData?.map((item) => item?.[yKey]);

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: counts,
        backgroundColor: "#004C78",
        barThickness: 30,
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
