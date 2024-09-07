import React from "react";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, totalAssets }) => {
  const pieData = {
    labels: ["Computers", "Monitors", "Servers", "Switches", "iPads"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / totalAssets) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value} assets (${percentage}%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-64 p-4"
    >
      <Pie data={pieData} options={pieOptions} />
      <div className="text-center mt-4 text-lg font-bold">
        Total Assets: {totalAssets}
      </div>
    </motion.div>
  );
};

export default PieChart;
