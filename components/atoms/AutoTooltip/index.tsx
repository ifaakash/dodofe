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
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => setShowTooltip(true), 500); // Delay of 500ms
        const hideTimer = setTimeout(() => setShowTooltip(false), tooltipDuration + 500); // Adjusted to account for the delay

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [tooltipDuration]);

    return (
        <div className=" flex items-center justify-center z-50">
            {children}
            {showTooltip && (
                <div
                    className="absolute right-0 top-full -mt-3 p-2 bg-black text-white text-xs rounded shadow transition-opacity duration-300 ease-in-out"
                    style={{
                        opacity: showTooltip ? 1 : 0,
                        transform: showTooltip ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                >
                    {tooltipText}
                    <div
                        style={{ right: '14px' }}
                        className="absolute right-3 top-0 -mt-1 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black"
                    ></div>
                </div>
            )}
        </div>
    );
};

export default AutoTooltip;
