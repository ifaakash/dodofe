import { Input } from '@components/atoms'
import NewButton from '@components/atoms/Button/NewButton'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { updateMediaKit } from 'api/services'
import { toast } from "react-hot-toast"
import { formatCurrency } from '@utils/helperFunctions'

const PricingEditModal = ({
    setIsPricingModalOpen,
    rateCardData,
    instaId,
    setUpdateMediaKit,
    engagementRate,
    contentNiche,
    followers
}: {
    setIsPricingModalOpen: (isOpen: boolean) => void,
    rateCardData: any,
    instaId: string,
    setUpdateMediaKit?: (updateMediaKit: boolean) => void,
    engagementRate: number,
    contentNiche: string,
    followers?: number
}) => {
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

    const engagementMultiplier = getEngagementMultiplier(engagementRate)
    const nicheMultiplier = getNicheMultiplier(contentNiche)

    const calculatePrice = (baseRate: number) => {
        const followersCount = followers || 1000 // Default to 1000 if followers is undefined
        return (
            (baseRate * followersCount / 1000) *
            engagementMultiplier *
            nicheMultiplier
        )
    }

    console.log(rateCardData)
    const [pricingData, setPricingData] = useState({
        reel: rateCardData?.rateCardData?.reel?.toString() || '129',
        post: rateCardData?.rateCardData?.post?.toString() || '103',
        story: rateCardData?.rateCardData?.story?.toString() || '65',
        carousel: rateCardData?.rateCardData?.carousel?.toString() || '116',
    })
    console.log(pricingData)
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsPricingModalOpen(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        const numValue = parseFloat(value) || 0
        setPricingData(prev => ({
            ...prev,
            [field]: numValue
        }))
    }

    const isFormValid = () => {
        return Object.values(pricingData).every(value => value > 0)
    }

    const handleSavePricing = async () => {
        setUpdateMediaKit?.(true)
        const response = await updateMediaKit({
            instaId: instaId,
            updates: {
                rateCard: {
                    isActive: rateCardData?.isActive,
                    rateCardData: pricingData
                }
            }
        })

        if (response.success) {
            toast.success('Pricing updated successfully')
            setIsPricingModalOpen(false)
            window.location.reload()
        } else {
            toast.error(response.message || 'Failed to update pricing')
        }
    }

    const pricingFields = [
        { key: 'reel', label: 'Instagram Reel', placeholder: '129' },
        { key: 'post', label: 'Instagram Post', placeholder: '103' },
        { key: 'story', label: 'Instagram Story', placeholder: '65' },
        { key: 'carousel', label: 'Instagram Carousel', placeholder: '116' },
    ]

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center animate-fadeIn p-[10px]"
            onClick={handleBackdropClick}
        >
            <div className='bg-[#FDFBFF] p-5 rounded-lg w-full flex flex-col gap-4 ease-in-out animate-slideUp transform transition-transform duration-300'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1 text-2xl font-bold'>
                        <div>Edit</div>
                        <div className='bg-gradient-to-r from-[#F37E57] to-[#EF3576] bg-clip-text text-transparent'>
                            Pricing
                        </div>
                    </div>
                    <X size={16} className='cursor-pointer' onClick={() => setIsPricingModalOpen(false)} />
                </div>

                <div className='text-[#0092DB] text-[10px] font-medium bg-[#E5F6FF] px-[10px] py-[6px] rounded-[10px]'>
                    Customize your Instagram rate card pricing. These are base rates per 1000 followers.
                </div>

                <div className='flex flex-col gap-3'>
                    {pricingFields.map((field) => (
                        <div key={field.key} className='flex flex-col gap-2'>
                            <div className='font-bold text-sm'>{field.label}</div>
                            <input
                                placeholder={pricingData[field.key as keyof typeof pricingData]}
                                value={pricingData[field.key as keyof typeof pricingData]}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                className='placeholder:text-xs placeholder:text-[#8994A9] text-sm w-full border border-[#EAE9EC] rounded-[10px] p-[14px] outline-none'
                                min="0"
                                step="0.01"
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-end'>
                    <NewButton
                        variant={isFormValid() ? "primary" : "disabled"}
                        size="large"
                        onClick={handleSavePricing}
                        className="w-full"
                    >
                        Save Pricing
                    </NewButton>
                </div>
            </div>
        </div>
    )
}

export default PricingEditModal 