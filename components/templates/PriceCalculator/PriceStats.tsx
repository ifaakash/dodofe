'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Card1 from 'public/assets/PriceCalculatorCard1.png'
import Card2 from 'public/assets/PriceCalculatorCard2.png'
import Card3 from 'public/assets/PriceCalculatorCard3.png'
import Card4 from 'public/assets/PriceCalculatorCard4.png'
import { formatCurrency } from '@utils/helperFunctions'

const cards = [
    { src: Card1, title: 'INSTAGRAM REEL', value: 9999999 },
    { src: Card2, title: 'INSTAGRAM REEL', value: 9999999 },
    { src: Card3, title: 'INSTAGRAM REEL', value: 9999999 },
    { src: Card4, title: 'INSTAGRAM REEL', value: 9999999 },
]

const PriceStats = () => {
    const [current, setCurrent] = useState(0)

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 50 && current < cards.length - 1) {
            setCurrent((prev) => prev + 1)
        }
        if (touchEndX - touchStartX > 50 && current > 0) {
            setCurrent((prev) => prev - 1)
        }
    }

    return (
        <div className='py-3'>
            <div
                className='overflow-hidden relative'
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className='min-w-full relative flex items-center justify-center px-3'
                        >
                            <Image
                                src={card.src}
                                alt={`Card ${index + 1}`}
                                className='w-full h-auto object-contain rounded-lg'
                            />
                            <div className='absolute flex flex-col gap-1 items-center justify-center'>
                                    <div className='font-extralight text-xs text-[#395235]'> {card.title} </div>
                                    <div className='text-2xl font-semibold'> {formatCurrency(card.value)} </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className='flex justify-center mt-4 gap-2'>
                {cards.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`cursor-pointer transition-all duration-300 ${index === current
                            ? 'w-6 h-2 rounded-full bg-gray-500'
                            : 'w-2 h-2 rounded-full bg-gray-300'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default PriceStats
