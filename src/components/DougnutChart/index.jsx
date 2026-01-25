import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ chartData = {} }) {

  
  if (!chartData || Object.keys(chartData).length === 0) {
    return <p>Loading chart data...</p>;
  }

  // Extract labels and values dynamically from the chartData object
  const labels = Object.keys(chartData); // e.g., ["Dogs", "Humans", "Mice"]
  const values = Object.values(chartData); // e.g., [3, 2, 1]

  // Generate nearby colors based on #00446C
  const baseColor = { h: 200, s: 80, l: 30 }; // HSL representation of #00446C
  const generateNearbyColors = (count) =>
    Array.from({ length: count }, (_, i) => {
      const variation = i * 10; // Increment lightness by 10% for each color
      return `hsl(${baseColor.h}, ${baseColor.s}%, ${
        baseColor.l + variation
      }%)`;
    });

  const backgroundColor = generateNearbyColors(labels.length);
  const borderColor = backgroundColor.map(
    (color) =>
      color.replace(
        /(\d+)%\)$/,
        (match) => `${Math.max(parseInt(match) - 10, 0)}%)`
      ) // Darken the color for borders
  );

  // Chart.js-compatible data object
  const data = {
    labels,
    datasets: [
      {
        label: "Distribution",
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
