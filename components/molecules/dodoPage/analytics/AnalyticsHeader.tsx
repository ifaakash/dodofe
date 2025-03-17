import { ArrowLeftIcon, ChevronsDown } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const AnalyticsHeader = ({ url }: { url: string }) => {
    const router = useRouter();
    return (
        <div className='flex items-center justify-between p-5 relative'>
            <div>
                <ArrowLeftIcon onClick={() => router.push(`/dodo/${url}`)} />
            </div>
            <div className='absolute left-1/2 top-12 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 '>
                <ChevronsDown size={16} />
                <div className='text-[10px] font-semibold text-[#3D4966]'>Pull to refresh</div>
            </div>
        </div>
    )
}

export default AnalyticsHeader