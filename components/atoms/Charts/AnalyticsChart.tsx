import React from "react";
import { PieChart, Pie, Cell } from "recharts";


const AnalyticsChart = ({ value1, value2 }: { value1: number, value2: number }) => {
    const hasValues = value1 > 0 && value2 > 0;

    const data = hasValues
        ? [
              { name: "Clicks", value: value1 },
              { name: "Views", value: value2 },
          ]
        : [
              { name: "Default 1", value: 75 },
              { name: "Default 2", value: 25 },
          ];

    const total = hasValues ? value1 + value2 : "00";

    const COLORS = hasValues ? ["#924CEA", "#FF7EA2"] : ["#D1D5DB", "#D1D5DB"]; // Green/Orange or Gray Shades
    return (
        <div className="relative w-[200px] h-[200px] flex justify-center items-center">
            {/* Donut Chart */}
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    cornerRadius={10}
                    paddingAngle={5}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>

            <div className="absolute flex flex-col items-center justify-center w-20 h-20 rounded-full bg-white">
                <span className="text-2xl font-semibold text-gray-800">
                    {total}
                </span>
                <span className="text-xs text-gray-500">Views</span>
            </div>
        </div>
    );
}

export default AnalyticsChart