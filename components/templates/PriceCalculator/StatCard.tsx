import Slider from '@components/atoms/slider/Slider'
import React from 'react'

const StatCard = () => {
    return (
        <div className=' bg-white flex flex-col gap-3'>
            <div className='border-[#E2E4E9] border-dashed border-2 py-5 rounded-[10px] '>
                <Slider title='Total followers'/>
            </div>
            <div className='border-[#E2E4E9] border-dashed border-2 py-5 rounded-[10px] '>
                <Slider title='Engagement'/>
            </div>
        </div>
    )
}

export default StatCard