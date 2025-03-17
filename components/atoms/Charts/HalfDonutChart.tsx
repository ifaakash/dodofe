import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const HalfDonutChart = ({paidAmount, pendingAmount}: {paidAmount: number, pendingAmount: number}) => {
  const data = [
    { name: "Paid", value: paidAmount },
    { name: "Pending", value: pendingAmount }
  ];

  const COLORS = ["#4CAF50", "#FF5733"]; // Customize colors

  return (
    <div className="flex justify-center items-center w-full">
      <PieChart width={400} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={120}
          outerRadius={150}
          paddingAngle={2} 
          cornerRadius={10}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default HalfDonutChart;
