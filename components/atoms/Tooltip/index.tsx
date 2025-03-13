import React, { useState, useEffect } from "react";

interface TooltipProps {
    message: string;
    children: React.ReactNode;
    duration?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children, duration = 3000 }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const showTooltip = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, duration);
    };

    return (
        <div onFocus={showTooltip} onMouseEnter={showTooltip}>
            {children}
            {visible && (
                <div className="absolute top-0 left-0 mt-[-20px] bg-gray-700 text-white text-xs rounded py-1 px-2">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Tooltip;