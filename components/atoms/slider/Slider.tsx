'use client';

import React, { useState } from 'react';

interface SliderProps {
  title: string;
  total: number;
  setTotal: (value: number) => void;
  max?: number;
  step?: number;
}

const formatNumber = (value: number) => {
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}k`;
  return value.toString();
};

export default function Slider({
  title,
  total,
  setTotal,
  max = 2000000,
  step = 1_000,
}: SliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(Number(e.target.value));
  };

  const handleMouseDown = () => setShowTooltip(true);
  const handleMouseUp = () => setShowTooltip(false);

  return (
    <div className="w-full px-4 flex flex-col gap-3">
      <div className="text-sm font-bold text-gray-700 text-center">
        {title}
        <div className="text-xl text-black">
          {title === 'Engagement' ? `${total}%` : formatNumber(total)}
        </div>
      </div>

      <div className="relative w-full">
        <input
          type="range"
          min={0}
          max={max}
          step={step}
          value={total}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#9651EC]"
        />
        {showTooltip && (
          <div
            className="absolute -top-8 text-sm font-medium bg-[#9651EC] text-white px-3 py-1 rounded-md shadow-md whitespace-nowrap"
            style={{ left: `${(total / max) * 100}%`, transform: 'translate(-50%, -100%)' }}
          >
            {title === 'Engagement' ? `${total}%` : formatNumber(total)}
          </div>
        )}
      </div>
    </div>
  );
}
