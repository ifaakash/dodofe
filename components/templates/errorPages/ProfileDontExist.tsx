import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SadDogImg from 'public/assets/SadDog.png'
import DodoIcon from "public/icons/dodoIconName.svg";
import cx from "classnames";
import styles from "./errorpages.module.css";


const ProfileDontExist = () => {
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

                        <div className='text-sm text-center'> The page you are looking for doesn’t exist! </div>
                    </div>

                    <Link
                        href={`https://dodoclub.in/`}
                        className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white rounded-full px-3 py-1 flex items-center gap-2"
                    >
                        <div className="font-semibold text-xs">
                            Create your DODOpage now
                        </div>
                        <div className="bg-[#7A208D] rounded-full p-1 text-white w-fit">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>

                <Link href={'http://dodoclub.in/'} className="flex items-center gap-2 absolute bottom-6 justify-center w-full">
                    <div className="text-[#3D4966] text-xs">powered by:</div>
                    <Image src={DodoIcon} alt="dodo icon" height={20} />
                </Link>

            </div>
        </div>
    )
}

export default ProfileDontExist;