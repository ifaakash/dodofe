import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const FullDonutChart = ({
  OptionA,
  OptionB,
  OptionC,
  OptionD,
}: {
  OptionA: number;
  OptionB: number;
  OptionC: number;
  OptionD: number;
}) => {
  const data = [
    { name: "Option A", value: OptionA, color: "#FB7053" },
    { name: "Option B", value: OptionB, color: "#F1C400" },
    { name: "Option C", value: OptionC, color: "#42ADD9" },
    { name: "Option D", value: OptionD, color: "#967BDD" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const hasValues = total > 0;

  const COLORS = hasValues
    ? ["#FB7053", "#F1C400", "#42ADD9", "#967BDD"]
    : ["#D1D5DB", "#D1D5DB", "#D1D5DB", "#D1D5DB"]; // Greyed-out state

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={hasValues ? data : [{ name: "Empty", value: 1 }]} // Show a single segment when empty
        cx="50%"
        cy="50%"
        innerRadius={28}
        outerRadius={40}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
        cornerRadius={10}
        paddingAngle={5}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default FullDonutChart;
