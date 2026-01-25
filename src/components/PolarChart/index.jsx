import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function PolarChart({ chartData = {} }) {
  // Transform data into the required format for the chart
  const labels = Object.keys(chartData);
  const dataValues = Object.values(chartData);

  // Define a base color in HSL
  const baseColor = { h: 200, s: 80, l: 30 }; // HSL representation of #00446C

  // Function to generate nearby colors based on the base color
  const generateNearbyColors = (count) =>
    Array.from({ length: count }, (_, i) => {
      const variation = i * 10; // Increment lightness for each color
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

  const data = {
    labels,
    datasets: [
      {
        label: "Counts",
        data: dataValues,
        backgroundColor, // Dynamically generated colors
        borderColor, // Dynamically generated darker borders
        borderWidth: 1,
      },
    ],
  };

  return <PolarArea data={data} />;
}
