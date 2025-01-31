import React from 'react';

const HalfDonutChart = ({ outStandingAmount = 20002, pendingAmount = 15358 }) => {
  const total = outStandingAmount + pendingAmount;
  const radius = 120;
  const strokeWidth = 30;
  const center = radius + strokeWidth;
  const circumference = Math.PI * radius;
  
  const outStandingPercentage = (outStandingAmount / total) * 100;
  const pendingPercentage = (pendingAmount / total) * 100;
  
  const outStandingStroke = (outStandingPercentage / 100) * circumference;
  const pendingStroke = (pendingPercentage / 100) * circumference;

  return (
    <div className="w-full max-w-md">
      <div>
        <div className="relative flex flex-col items-center">
          <svg
            width={center * 2}
            height={center + strokeWidth/2}
            className=""
            viewBox={`0 0 ${center * 2} ${center + strokeWidth/2}`}
          >
            {/* Background circle */}
            <path
              d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth} ${center}`}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
            />
            
            {/* Outstanding amount arc */}
            <path
              d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth} ${center}`}
              fill="none"
              stroke="#15CF62"
              strokeWidth={strokeWidth}
              strokeDasharray={`${outStandingStroke} ${circumference}`}
            />
            
            {/* Pending amount arc */}
            <path
              d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${center * 2 - strokeWidth} ${center}`}
              fill="none"
              stroke="#FF865A"
              strokeWidth={strokeWidth}
              strokeDasharray={`${pendingStroke} ${circumference}`}
              strokeDashoffset={-outStandingStroke}
            />
          </svg>         
        </div>
      </div>
    </div>
  );
};

export default HalfDonutChart;