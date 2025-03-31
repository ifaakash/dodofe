import { formatCurrency } from '@utils/helperFunctions';
import { ChevronsDown } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

const PriceStats = ({
    setShowAll,
    showAll,
    priceStatData,
}: {
    setShowAll: (showAll: boolean) => void;
    showAll: boolean;
    priceStatData: any;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string | number>('auto');

    useEffect(() => {
        if (containerRef.current) {
            if (showAll) {
                setHeight(containerRef.current.scrollHeight);
            } else {
                setHeight(containerRef.current.firstElementChild?.scrollHeight || 0);
            }
        }
    }, [showAll, priceStatData]);

    const dataToRender = showAll ? priceStatData : [priceStatData[0]];

    return (
        <div className="p-4">
            <div
                className="rounded-xl shadow-lg py-6 px-4 max-w-xl mx-auto transition-all duration-500"
                style={{
                    background: 'linear-gradient(167deg, #FEF3CD -75.69%, #FBD0E2 55.01%, #E0D4F7 185.7%)',
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        maxHeight: height,
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease',
                    }}
                >
                    {dataToRender.map((stat: any, idx: number) => (
                        <div key={idx} className="flex flex-col gap-2">
                            <div className="flex justify-center text-sm font-medium leading-none">
                                {stat.title}
                            </div>

                            <div className="flex justify-center text-xl font-bold leading-none">
                                {formatCurrency(stat.value)}
                            </div>

                            {idx !== dataToRender.length - 1 && (
                                <hr className="border-t border-white my-3 w-3/4 mx-auto" />
                            )}
                        </div>
                    ))}
                </div>

                <div
                    className="flex justify-center gap-1 items-center text-xs font-semibold text-[#6317CF] cursor-pointer mt-4"
                    onClick={() => setShowAll(!showAll)}
                >
                    View {showAll ? 'less' : 'more'}
                    <ChevronsDown
                        width={14}
                        height={14}
                        className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'animate-bounce'
                            }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceStats;
