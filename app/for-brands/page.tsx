"use client";

import FloatingBar from '@components/templates/Landing/FloatingBar'
import React from 'react'
import styles from "./brands.module.css";
import cx from "classnames";
import NewButton from '@components/atoms/Button/NewButton';
import { useRouter } from 'next/navigation';
import ComingSoon from 'public/assets/comingSoon.png'
import Image from 'next/image';

const ForBrands = () => {
    const router = useRouter()

    const handleNavigation = () => {
        router.push('/')
    }
    return (
        <div className={"h-screen flex justify-center items-center"}>
            <div className={styles.backgroundDots}></div>
            <FloatingBar />

            <div className='flex flex-col gap-4 justify-center items-center'>


                <Image src={ComingSoon} alt="Coming Soon" className='w-[150px] h-[150px]' />
                <div className='flex flex-col gap-2 items-center'>
                    <span className="bg-gradient-to-r  from-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none text-2xl font-semibold" >
                        Coming Soon
                    </span>
                    <div> We are crafting something for you </div>
                </div>
            </div>
        </div>
    )
}

export default ForBrands