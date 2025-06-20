const LocaltionDistributionChart = ({ locationDistributionData }: { locationDistributionData: { location: string; percentage: number }[] }) => {
    return (
        <div className="flex flex-col gap-[10px] w-full py-2">
            {locationDistributionData.map((data, index) => (
                <div key={index} className="w-full rounded-[4px]">
                    <div className="flex justify-between w-full text-[10px]">
                        <div className="font-medium text-[#5E6C84]">{data.location}</div>
                        <div className="font-medium text-[#3D4966]">{data.percentage}%</div>
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
    )
}

export default LocaltionDistributionChart