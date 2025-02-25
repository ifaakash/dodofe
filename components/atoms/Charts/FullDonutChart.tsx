import React from "react";

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

  if (total === 0) {
    return (
      <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="0" cy="0" r="1" fill="#E5E7EB" />
        <circle cx="0" cy="0" r="0.5" fill="white" />
      </svg>
    );
  }

  let cumulativePercentage = 0;

  const getCoordinates = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  return (
    <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
      {data.map((item, index) => {
        const start = getCoordinates(cumulativePercentage);
        cumulativePercentage += item.value / total;
        const end = getCoordinates(cumulativePercentage);
        const largeArcFlag = item.value / total > 0.5 ? 1 : 0;

        return (
          <path
            key={index}
            d={`M ${start[0]} ${start[1]} A 1 1 0 ${largeArcFlag} 1 ${end[0]} ${end[1]} L 0 0`}
            fill={item.color}
          />
        );
      })}
      {/* Donut Hole */}
      <circle cx="0" cy="0" r="0.5" fill="white" />
    </svg>
  );
};

export default FullDonutChart;
