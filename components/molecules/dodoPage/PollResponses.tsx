import React, { useState } from "react";
import FullDonutChart from "@components/atoms/Charts/FullDonutChart";

const PollResponses = ({ pollData }: { pollData: any }) => {
  // Calculate total votes and individual option percentages
  const totalVotes = Object.values(pollData?.optionCounts || {}).reduce(
    (sum: number, count) => sum + (count as number),
    0
  );

  const getOptionVotes = (option: string): number => {
    return pollData?.optionCounts?.[option] || 0;
  };

  const getOptionPercentage = (option: string): number => {
    if (totalVotes === 0) return 0;
    return Math.round((getOptionVotes(option) / totalVotes) * 100);
  };

  return (
    <div className="bg-white px-4 py-3 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">Responses</div>
          <div className="text-[#414D55] text-xs">
            Promote dodopage to get more response
          </div>
        </div>
        <div className="font-semibold">{totalVotes}</div>
      </div>
      <div className="flex gap-6">
        <div className="w-32">
          <FullDonutChart 
            OptionA={getOptionPercentage(pollData?.options[0]) || 0}
            OptionB={getOptionPercentage(pollData?.options[1]) || 0}
            OptionC={getOptionPercentage(pollData?.options[2]) || 0}
            OptionD={getOptionPercentage(pollData?.options[3]) || 0}
          />
        </div>
        <div className="flex flex-col w-full text-xs gap-1">
          {pollData?.options.map((option: string, index: number) => (
            <div key={index} className="flex justify-between items-center w-full">
              <div className="flex gap-1 items-center">
                <div className={`w-[10px] h-[10px] rounded-full ${
                  index === 0 ? 'bg-[#FB7053]' :
                  index === 1 ? 'bg-[#F1C400]' :
                  index === 2 ? 'bg-[#42ADD9]' :
                  'bg-[#967BDD]'
                }`}></div>
                <div className="font-medium">{option}</div>
              </div>
              <div className="font-semibold">{getOptionVotes(option)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-1">
        {pollData?.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`w-full py-1 px-2 rounded-[4px] text-white text-center font-semibold ${
              index === 0 ? 'bg-[#FB7053]' :
              index === 1 ? 'bg-[#F1C400]' :
              index === 2 ? 'bg-[#42ADD9]' :
              'bg-[#967BDD]'
            }`}
          >
            {getOptionPercentage(option)}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollResponses;
