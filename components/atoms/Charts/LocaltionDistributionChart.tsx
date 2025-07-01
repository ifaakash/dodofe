const LocaltionDistributionChart = ({ locationDistributionData }) => {
    const chartData = Array.isArray(locationDistributionData)
        ? locationDistributionData.filter(data => data && data.location && data.percentage != null)
        : Object.entries(locationDistributionData)
            .filter(([location, percentage]) => location && percentage != null)
            .map(([location, percentage]) => ({
                location,
                percentage
            }));

    return (
        <div className="flex flex-col gap-[10px] w-full py-2">
            {chartData.map((data, index) => (
                <div key={index} className="w-full rounded-[4px]">
                    <div className="flex justify-between w-full  text-[#5E6C84] ">
                        <div className="text-[10px] font-bold">{data.location}</div>
                        <div className="text-xs font-medium">{data.percentage}%</div>
                    </div>
                    <div className="relative w-full h-[10px] bg-gray-200 rounded-[4px] overflow-hidden">
                        <div
                            className="bg-[#3D4966] h-[10px] rounded-[4px] transition-all duration-300"
                            style={{ width: `${data.percentage}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocaltionDistributionChart