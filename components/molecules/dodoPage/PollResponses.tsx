import React, { useEffect, useState } from "react";
import FullDonutChart from "@components/atoms/Charts/FullDonutChart";
import { getPollResponses } from "api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PollResponses = ({ id }) => {
  const [pollResponseData, setPollResponseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPollResponses = async () => {
      try {
        const res = await getPollResponses({ blockId: id });
        setPollResponseData(res.pollBlock);
      } catch (err) {
        console.error("Failed to fetch poll data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPollResponses();
  }, [id]);

  const totalVotes = pollResponseData
    ? (Object.values(pollResponseData.optionCounts || {}) as number[]).reduce(
      (sum, count) => sum + count,
      0
    )
    : 0;

  const getOptionVotes = (option: string): number => {
    return pollResponseData?.optionCounts?.[option] || 0;
  };

  const getOptionPercentage = (option: string): number => {
    const optionVotes = getOptionVotes(option);
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes / totalVotes) * 100);
  };

  if (loading) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl w-full">
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={200} className="mt-2" />
        <div className="flex gap-6 mt-4">
          <Skeleton circle width={100} height={100} />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton height={15} count={4} />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Skeleton height={30} width="100%" count={4} />
        </div>
      </div>
    );
  }

  if (!pollResponseData) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl w-full text-sm text-gray-500">
        No data found.
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-3 rounded-xl flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">Responses</div>
          <div className="text-[#414D55] text-xs">
            Promote dodopage to get more responses
          </div>
        </div>
        {/* @ts */}
        <div className="font-semibold">{totalVotes}</div>
      </div>

      <div className="flex gap-6">
        <div className="w-32">
          <FullDonutChart
            OptionA={getOptionPercentage(pollResponseData.options[0])}
            OptionB={getOptionPercentage(pollResponseData.options[1])}
            OptionC={getOptionPercentage(pollResponseData.options[2])}
            OptionD={getOptionPercentage(pollResponseData.options[3])}
          />
        </div>

        <div className="flex flex-col w-full text-xs gap-1">
          {pollResponseData.options.map((option: string, index: number) => (
            <div key={index} className="flex justify-between items-center w-full">
              <div className="flex gap-1 items-center">
                <div
                  className={`w-[10px] h-[10px] rounded-full ${index === 0
                    ? "bg-[#FB7053]"
                    : index === 1
                      ? "bg-[#F1C400]"
                      : index === 2
                        ? "bg-[#42ADD9]"
                        : "bg-[#967BDD]"
                    }`}
                ></div>
                <div className="font-medium">{option}</div>
              </div>
              <div className="font-semibold">{getOptionVotes(option)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-1">
        {pollResponseData.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`w-full py-1 px-2 rounded-[4px] text-white text-center font-semibold ${index === 0
              ? "bg-[#FB7053]"
              : index === 1
                ? "bg-[#F1C400]"
                : index === 2
                  ? "bg-[#42ADD9]"
                  : "bg-[#967BDD]"
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
