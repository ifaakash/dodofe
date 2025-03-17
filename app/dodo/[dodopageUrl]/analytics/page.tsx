'use client'
import AnalyticsMain from '@components/molecules/dodoPage/analytics/AnalyticsMain';
import React, { useState } from 'react'
import AnalyticsHeader from '@components/molecules/dodoPage/analytics/AnalyticsHeader'
import NewButton from '@components/atoms/Button/NewButton';
import { useRouter, useParams } from 'next/navigation';

const mockData = {
   totalViews: 1000,
   totalClicks: 4000,
   avgTime: 40,
   ctr: 20,
   bounceRate: 50
}
const AnalyticsPage = () => {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState('overall')
    const { dodopageUrl } = useParams();


    return (
        <div>
            <AnalyticsHeader url={dodopageUrl as string} />

            <div className='p-5 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <div className='text-[#979EAD] leading-none'>Your DODOpage</div>
                    <div className='text-[#3D4966] font-bold text-[32px] leading-none'>Analytics</div>
                </div>

                <AnalyticsMain timeRange={timeRange} setTimeRange={setTimeRange} data={mockData} />
            </div>

            <div className='px-5 pt-20 flex justify-center items-center text-center text-sm'>
                Full customised Analytics <br />
                coming soon...
            </div>


            <div className="bottom-0 fixed mb-4 px-4 w-full">
                <NewButton
                    size="large"
                    variant={"primary"}
                    onClick={() => router.push(`/dodo/${dodopageUrl}`)}
                    className="w-full"
                >
                    Okay
                </NewButton>
            </div>

        </div>
    )
}

export default AnalyticsPage;