import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SadDogImg from 'public/assets/SadDog.png'
import DodoIcon from "public/icons/dodoIconName.svg";
import cx from "classnames";
import styles from "./errorpages.module.css";
import { RotateCcwIcon } from 'lucide-react'


const GeneralErrorPage = () => {

    const handleRefresh = () => {
        localStorage.removeItem("persist:root");
        window.location.href = '/';
    }
    return (
        <div className="relative h-screen bg-white overflow-hidden">
            <div className={styles.backgroundDots}></div>

            <div className="flex flex-col gap-3 px-5 items-center justify-center h-full relative z-10">

                <div className="flex flex-col gap-3 px-5 items-center z-10">

                    <Image src={SadDogImg} alt="sad dog" height={200} className="" />

                    <div className='flex flex-col gap-2 items-center max-w-[270px]'>
                        <div className="text-2xl font-semibold">
                            <span className='bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent'>Oops!</span>😅
                        </div>

                        <div className='text-sm text-center'>Something went wrong, while loading this page, please try again. </div>
                    </div>

                    <div onClick={handleRefresh} className='py-3 px-5 border-[1px] border-[#979EAD] rounded-full bg-white flex gap-2 items-center'>
                        <RotateCcwIcon size={18} />
                        <div className='font-semibold text-brandPrimary'>
                            Refresh
                        </div>

                    </div>
                </div>

                <Link href={'http://dodoclub.in/'} className="flex items-center gap-2 absolute bottom-6 justify-center w-full">
                    <div className="text-[#3D4966] text-xs">powered by:</div>
                    <Image src={DodoIcon} alt="dodo icon" height={20} />
                </Link>

            </div>
        </div>
    )
}

export default GeneralErrorPage;