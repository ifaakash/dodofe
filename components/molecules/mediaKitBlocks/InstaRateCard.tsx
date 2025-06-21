import Toggle from "@components/atoms/Toggle/Toggle"
import InstaRateCardIcon from "../../../public/assets/Coins.svg"
import DragIcon from '../../../public/icons/drag.svg'
import Image from 'next/image'
import Card1 from 'public/assets/PriceCalculatorCard1.png'
import Card2 from 'public/assets/PriceCalculatorCard2.png'
import Card3 from 'public/assets/PriceCalculatorCard3.png'
import Card4 from 'public/assets/PriceCalculatorCard4.png'
import { formatCurrency } from '@utils/helperFunctions'
import { useState, useMemo } from "react"
import { updateMediaKit } from "api/services"



const InstaRateCard = ({
    rateCardData,
    instaId,
    setUpdateMediaKit,
    engagementRate,
    followers,
    mode = 'edit'
    }: {
    rateCardData: any,
    instaId: string,
    setUpdateMediaKit?: (updateMediaKit: boolean) => void,
    engagementRate: number,
    followers: number,
    mode: 'edit' | 'public' | 'preview'
    }) => {
    const [current, setCurrent] = useState(0)
    const contentNiche = 'fashion'


    const getEngagementMultiplier = (rate: number) => {
        if (rate > 10) return 1.5
        if (rate > 5) return 1.2
        if (rate >= 2) return 1.0
        return 0.8
    }

    const getNicheMultiplier = (niche: string) => {
        const highValue = ['fashion', 'beauty', 'tech', 'finance']
        const midValue = ['food', 'travel', 'fitness', 'lifestyle']
        const lowValue = ['art', 'gaming', 'memes', 'photography']
        const premium = ['business', 'education', 'saas']

        niche = niche?.toLowerCase()

        if (premium.includes(niche)) return 3
        if (highValue.includes(niche)) return 2.5
        if (midValue.includes(niche)) return 2.0
        if (lowValue.includes(niche)) return 1.6

        return 1.0
    }

    const baseRates = {
        reel: 129,
        post: 103,     // approx 80% of reel
        story: 65,     // approx 50% of reel
        carousel: 116, // approx 90% of reel
    }


    const cards = useMemo(() => {
        const engagementMultiplier = getEngagementMultiplier(engagementRate)
        const nicheMultiplier = getNicheMultiplier(contentNiche)

        const calculatePrice = (baseRate: number) => {
            return (
                (baseRate * followers / 1000) *
                engagementMultiplier *
                nicheMultiplier
            )
        }

        return [
            {
                src: Card1,
                title: 'INSTAGRAM REEL',
                value: calculatePrice(baseRates.reel),
            },
            {
                src: Card2,
                title: 'INSTAGRAM POST',
                value: calculatePrice(baseRates.post),
            },
            {
                src: Card3,
                title: 'INSTAGRAM STORY',
                value: calculatePrice(baseRates.story),
            },
            {
                src: Card4,
                title: 'INSTAGRAM CAROUSEL',
                value: calculatePrice(baseRates.carousel),
            },
        ]
    }, [followers, engagementRate, contentNiche])

    // Mobile swipe
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

    const handleToggle = async () => {
        setUpdateMediaKit(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                rateCard: {
                    isActive: !rateCardData?.isActive,
                    rateCardData: rateCardData?.rateCardData
                }
            }
        })
        console.log('response', response)
    }

    return (
        <div className={`p-[10px] bg-[#FDFBFF] rounded-xl flex flex-col gap-1 ${rateCardData?.isActive ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`flex justify-between items-center ${mode === 'public' ? 'hidden' : ''}`}>
                <Image className={`w-5 h-5 ${rateCardData?.isActive ? 'pointer-events-auto' : 'pointer-events-none'}`} src={DragIcon} alt="Drag" />
                <Toggle checked={rateCardData?.isActive} onCheckedChange={handleToggle} />
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-[#F2F1F3] to-[#FDFBFF] rounded-lg">
                <div className="text-[#1F9D73] w-full px-2 py-1 flex gap-1">
                    <div className="text-xs font-semibold"> Instagram </div>
                    <div className="text-[10px]"> RATE CARD </div>
                </div>
                <Image src={InstaRateCardIcon} alt="Gender Distribution" />
            </div>

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
                                    <div className='font-extralight text-xs text-[#395235]'>
                                        {card.title}
                                    </div>
                                    <div className='text-xl font-semibold'>
                                        {card.value > 0
                                            ? `${formatCurrency(Math.round(card.value * 0.85))} - ${formatCurrency(Math.round(card.value * 1.15))}`
                                            : formatCurrency(Math.round(card.value))}
                                    </div>

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

        </div>
    )
}

export default InstaRateCard