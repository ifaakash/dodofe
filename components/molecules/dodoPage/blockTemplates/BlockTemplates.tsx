import React from 'react'
import Social from "public/icons/SocialIcon.svg";
import Link from "public/icons/LinkIcon.svg";
import Youtube from "public/icons/YoutubeIcon.svg";
import Heading from "public/icons/Heading.svg";
import Poll from "public/icons/PollIcon.svg";
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import styles from './BlockTemplates.module.css';
import Product from "public/icons/ProductIcon.svg";
import router from 'next/router';
import { useRouter } from 'next/navigation';

const blockTemplateData = [
    {
        title: "Add your",
        highlitedTitle: "Social",
        type: "social",
        icon: Social
    },
    {
        title: "Add your first",
        highlitedTitle: "Link",
        type: "link",
        icon: Link
    },
    {
        title: "Add your first",
        highlitedTitle: "Youtube Link",
        type: "link",
        icon: Youtube
    },
    {
        title: "Add your first",
        highlitedTitle: "Poll",
        type: "poll",
        icon: Poll
    },
]

const productBlockTemplateData = [
    {
        title: 'Add your',
        highlitedTitle: 'Product',
        icon: Product,
        type: "product"
    },
    {
        title: 'Add your',
        highlitedTitle: 'Product',
        icon: Product,
        type: "product"
    }
]

const BlockTemplates = ({ dodoPageUrl }: { dodoPageUrl: string }) => {
    const router = useRouter()

    const handleNavigate = (type: string) => {
       router.push(`/dodo/${dodoPageUrl}/addBlock?type=${type}`)
    }


    return (
        <div className="min-h-[50vh]  px-5 flex flex-col gap-[10px]">
            <div className='flex flex-col gap-[10px]'>
                {
                    blockTemplateData.map((item, index) => (
                        <div key={index} className={`${styles.blockTemplateItem} flex items-center justify-between gap-2 bg-white`} onClick={() => handleNavigate(item.type)}>
                            <div className='flex items-center gap-[10px]'>
                                <Image src={item.icon} alt={item.title} width={20} height={20} />
                                <div className='text-xs font-semibold'>
                                    {item.title}
                                    <span className='bg-gradient-to-r  from-[#F15669] to-[#F13C74] bg-clip-text text-transparent leading-none'> {item.highlitedTitle} </span>
                                </div>
                            </div>
                            <ChevronRight size={16} />
                        </div>
                    ))
                }
            </div>

            <div className='flex gap-[10px]'>
                {
                    productBlockTemplateData.map((item, index) => (
                        <div key={index} className={`${styles.blockTemplateItem} flex items-center justify-between gap-2 min-h-[200px] w-full`} onClick={() => handleNavigate(item.type)}>
                            <div className='flex items-center jus gap-[10px] justify-center w-full flex-col'>
                                <Image src={item.icon} alt={item.title} width={20} height={20} />
                                <div className='text-xs font-semibold flex flex-col'>
                                    {item.title}
                                    <span className='bg-gradient-to-r  from-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none'> {item.highlitedTitle} </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default BlockTemplates