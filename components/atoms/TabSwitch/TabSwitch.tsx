import React from 'react'

const TabSwitch = ({ timeRange, setTimeRange, timeRangeOptions, handleTimeRangeChange }: { timeRange: string, setTimeRange: (value: string) => void, timeRangeOptions: { value: string, label: string }[], handleTimeRangeChange: (value: string) => void }) => {
    return (
        <div className='flex gap-1 items-center'>
            {timeRangeOptions.map((option) => (
                <div key={option.value} className={`text-xs w-full px-3 py-2 ${timeRange === option.value ? 'border-[1px] border-brandPrimary text-black' : 'text-[#979EAD] border-[1px] border-[#E5E7EB]'} rounded-lg bg-white whitespace-nowrap text-center`} onClick={() => handleTimeRangeChange(option.value)}>
                    {option.label}
                </div>
            ))}
        </div>      
    )
}

export default TabSwitch