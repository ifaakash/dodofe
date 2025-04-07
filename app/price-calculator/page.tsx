'use client'
import React, { useState } from 'react';
import { Header } from '@components/molecules/Header';
import './priceCalculator.module.css';
import PriceStats from '@components/templates/PriceCalculator/PriceStats';
import ContentDropdown from '@components/templates/PriceCalculator/ContentDropdown';
import styles from './priceCalculator.module.css';
import cx from 'classnames';
import Slider from '@components/atoms/slider/Slider'

const PriceCalculatorPage: React.FC = () => {
    const [contentNiche, setContentNiche] = useState<string>('Fashion');
    const [totalFollowers, setTotalFollowers] = useState<number>(10000);
    const [engagementRate, setEngagementRate] = useState<number>(50000);
    return (
        <div className={cx(styles.priceCalculator)}>
            <Header />
            <div className='pt-20 px-5 flex flex-col gap-5 min-h-screen h-full'>
                <div className='flex flex-col gap-1'>
                    <div className='text-3xl font-extrabold leading-8'>Instagram Price Calculator</div>
                    <div className='text-[#3D4966] font-medium text-sm'>Know Your Instagram Worth</div>
                </div>


                <div className='flex gap-2 flex-col'>
                    <div className='bg-[#FDFBFF] min-h-[100px] rounded-2xl relative overflow-visible z-0 mb-10'>

                        <PriceStats totalFollowers={totalFollowers} engagementRate={engagementRate} contentNiche={contentNiche} />

                        <div className='bg-white flex items-center relative my-3'>
                            <div className="w-5 h-3 bg-[#EAE9EC] rounded-b-xl z-10 rotate-90 absolute -right-1"></div>
                            <div className="w-full border-t border-dashed border-[#E2E4E9]" />
                            <div className="w-5 h-3 bg-[#EAE9EC] rounded-b-xl z-10 -rotate-90 absolute -left-1"></div>
                        </div>

                        <div className='p-3 flex flex-col gap-3'>
                            <ContentDropdown contentNiche={contentNiche} setContentNiche={setContentNiche} />

                            <div className='flex gap-2 flex-col'>
                                <div className=' bg-white flex flex-col gap-3'>
                                    <div className='border-[#E2E4E9] border-dashed border-2 py-5 rounded-[10px] '>
                                        <Slider title='Total followers' total={totalFollowers} setTotal={setTotalFollowers} />
                                    </div>
                                    <div className='border-[#E2E4E9] border-dashed border-2 py-5 rounded-[10px] '>
                                        <Slider
                                            title="Engagement"
                                            total={engagementRate}
                                            setTotal={setEngagementRate}
                                            max={100}
                                            step={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceCalculatorPage;
