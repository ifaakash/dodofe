"use client";

import FloatingBar from '@components/templates/Landing/FloatingBar'
import React from 'react'
import styles from "./brands.module.css";
import cx from "classnames";
import NewButton from '@components/atoms/Button/NewButton';
import { useRouter } from 'next/navigation';

const ForBrands = () => {
    const router = useRouter()
    
    const handleNavigation = () => {
        router.push('/')
    }
    return (
        <div className={cx(styles.bgGrid, "h-screen flex justify-center items-center")}>
            <FloatingBar />

            <div className='flex flex-col gap-4 justify-center items-center'>

                <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none text-4xl font-semibold" >
                    Coming Soon
                </span>
                <button onClick={handleNavigation} className='bg-white boder rounded-full px-8 w-fit py-2 border-[1px] border-black text-brandPrimary font-semibold'>
                    Go to Home
                </button>
            </div>
        </div>
    )
}

export default ForBrands