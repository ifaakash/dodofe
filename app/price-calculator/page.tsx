'use client'
import React, { useState } from 'react';
import PriceCalculator from '@components/templates/PriceCalculator';
import { Header } from '@components/molecules/Header';
import WhatsappIcon from 'public/icons/whatsapp2.svg'
import Image from 'next/image';
import './priceCalculator.module.css';
import { ChevronsDown } from 'lucide-react';
import PriceStats from '@components/templates/PriceCalculator/PriceStats';
import ContentDropdown from '@components/templates/PriceCalculator/ContentDropdown';
import StatCard from '@components/templates/PriceCalculator/StatCard';

const priceStatData = [
    {
        title: 'Instagram Reel',
        value: 9999999
    },
    {
        title: 'Instagram Post',
        value: 9999999
    },
    {
        title: 'Instagram Story',
        value: 9999999
    },
    {
        title: 'Instagram Story with link',
        value: 9999999
    },
    {
        title: 'Instagram Instagram Carousel',
        value: 9999999
    },
]

const PriceCalculatorPage: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    return (
        <div className='bg-[#EAE9EC]'>
            <Header />
            <div className='pt-20 px-5 flex flex-col gap-5 min-h-screen h-full'>
                <div className='flex flex-col gap-1'>
                    <div className='text-3xl font-extrabold leading-8'>Instagram Price Calculator</div>
                    <div className='text-[#3D4966] font-medium text-sm'>Know Your Instagram Worth</div>
                </div>


                <div className='flex gap-2 flex-col'>
                    <div className='bg-white rounded-lg p-2 flex gap-2'>
                        <Image src={WhatsappIcon} width={16} height={16} alt='Whatsapp Icon' />
                        <div className='text-[#3D4966] font-medium text-xs'>
                            This pricing is based on user data, Price may different based on user and brand value.
                        </div>
                    </div>



                    <div className='bg-[#FDFBFF] min-h-[100px] rounded-lg relative overflow-visible z-0 mb-10'>

                        <PriceStats setShowAll={setShowAll} showAll={showAll} priceStatData={priceStatData} />

                        <div className='bg-white flex items-center relative my-3'>
                            <div className="w-5 h-3 bg-[#EAE9EC] rounded-b-xl z-10 rotate-90 absolute -right-1"></div>
                            <div className="w-full border-t border-dashed border-[#E2E4E9]" />
                            <div className="w-5 h-3 bg-[#EAE9EC] rounded-b-xl z-10 -rotate-90 absolute -left-1"></div>
                        </div>

                        <div className='p-3 flex flex-col gap-3'>
                            <ContentDropdown />

                            <div className='flex gap-2 flex-col'>
                                <StatCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalculatorPage;
