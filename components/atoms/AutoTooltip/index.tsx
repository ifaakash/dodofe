import React, { useEffect, useState, ReactNode } from 'react';

type AutoTooltipProps = {
    children: ReactNode;
    tooltipText: string;
    tooltipDuration?: number; // in ms, default 3000
};

const AutoTooltip = ({
    children,
    tooltipText,
    tooltipDuration = 3000,
}: AutoTooltipProps) => {
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), tooltipDuration);
        return () => clearTimeout(timer);
    }, [tooltipDuration]);

    return (
        <div className=" flex items-center justify-center z-50">
            {children}
            {showTooltip && (
                <div className="absolute right-0 top-full -mt-3 p-2 bg-black text-white text-xs rounded shadow">
                    {tooltipText}
                    <div className="absolute right-3 top-0 -mt-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black"></div>
                </div>
            )}
        </div>
    );
};

export default AutoTooltip;
