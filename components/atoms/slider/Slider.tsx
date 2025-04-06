import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HorizontalSlider.css';

export default function HorizontalSlider({
  title,
  total,
  setTotal,
  max = 200000,
  step = 1000,
}: {
  title: string;
  total: number;
  setTotal: (value: number) => void;
  max?: number;
  step?: number;
}) {
  const values = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);


  const [selectedValue, setSelectedValue] = useState(() => {
    const closest = values.reduce((prev, curr) =>
      Math.abs(curr - total) < Math.abs(prev - total) ? curr : prev
    );
    return closest;
  });
  const sliderRef = useRef(null);

  const barWidth = 8;
  const gap = 16;
  const itemWidth = barWidth + gap;

  useEffect(() => {
    setTotal(selectedValue);
  }, [selectedValue]);


  useEffect(() => {
    if (!sliderRef.current) return;
    const index = values.indexOf(selectedValue);
    const scrollOffset = index * itemWidth;
    sliderRef.current.scrollTo({
      left: scrollOffset - sliderRef.current.clientWidth / 2,
      behavior: 'smooth',
    });
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const center = scrollLeft + sliderRef.current.clientWidth / 2;
    const index = Math.round(center / itemWidth);

    if (values[index] !== undefined && values[index] !== selectedValue) {
      setSelectedValue(values[index]);
    }
  };

  const selectedIndex = values.indexOf(selectedValue);

  return (
    <div className="w-full px-4">
      <div className="text-sm font-bold text-gray-700 text-center mb-4">
        {title}
        <div className="text-xl text-black">
          {title === 'Engagement'
            ? `${Math.round(selectedValue)}%`
            : Math.round(selectedValue).toLocaleString()}
        </div>


      </div>

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className={`
          slider-container
          overflow-x-auto
          overflow-y-hidden
          flex
          space-x-4
          w-full
          snap-x 
          snap-mandatory 
          touch-pan-x 
          scrollbar-hide
        `}
        style={{ overscrollBehavior: 'contain' }} // prevents mouse wheel bounce on Mac
      >
        {values.map((val, i) => {
          const distance = Math.abs(i - selectedIndex);
          const maxBarHeight = 50;
          const stepDown = 5;
          const minBarHeight = 10;

          let barHeight = maxBarHeight - distance * stepDown;
          if (barHeight < minBarHeight) barHeight = minBarHeight;

          return (
            <div key={val} className="bar-wrapper snap-center flex items-center">
              <motion.div
                className={`bar ${val === selectedValue ? 'bg-[#9651ECE5]' : 'bg-[#9651EC99]/60'
                  }`}
                animate={{ height: barHeight }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedValue(val)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
