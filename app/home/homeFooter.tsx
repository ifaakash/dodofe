"use client";

import React from "react";
import Image from "next/image";
import cx from "classnames";
import Link from "next/link";
import { Home, FileText, MoreHorizontal, User } from "lucide-react";

import greenBg from 'public/assets/greenBg.svg';
import creatorsImg from 'public/assets/creators.png';
import footerStrip from 'public/assets/footerStrip.svg'

import StarSpinner from "./StarSpinner";
import styles from "./home.module.css";

const BottomNavbar = () => (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center py-2 shadow-md md:hidden">
        <Link href="/home" className="flex flex-col items-center text-xs text-gray-700 hover:text-black">
            <Home size={22} />
            <span>Home</span>
        </Link>
        <Link href="/media-kit" className="flex flex-col items-center text-xs text-gray-700 hover:text-black">
            <User size={22} />
            <span>MediaKit</span>
        </Link>
        <Link href="/more" className="flex flex-col items-center text-xs text-gray-700 hover:text-black">
            <MoreHorizontal size={22} />
            <span>More</span>
        </Link>
    </nav>
);

const HomeFooter = () => {

    return <>
        <BottomNavbar />
        <div className="mb-4 pt-8 bg-white relative" style={{ paddingBottom: 80 }}>
            <div className="mx-4 text-left">
                <span className="text-sm font-normal">Super app for</span><br />
                <span className="text-4xl font-bold">Creators..!</span><br />

                <Image
                    width={120}
                    height={20}
                    src={creatorsImg}
                    alt="creators"
                    loading="lazy"
                    className="mt-6"
                />
                <span className="text-sm font-normal">100+ Creators Onboarded...</span><br />
            </div>

            {/* <div className="absolute right-2 mb-2 bottom-20">
                <StarSpinner />
            </div> */}

            {/* <Image
                height={100}
                src={greenBg}
                alt="green bg"
                className="mt-4 w-full"
                style={{ marginBottom: '-20px' }}
                loading="lazy"
            /> */}

            {/* <div className={styles.movingStripWrapper} >
                <div className={styles.movingStrip} >
                    <Image
                        height={100}
                        src={footerStrip}
                        layout="responsive"
                        alt="green bg"
                        loading="lazy"
                        className={cx('mt-4 w-full', styles.stripImage)}
                    />
                    <Image
                        height={100}
                        src={greenBg}
                        layout="responsive"
                        alt="green bg duplicate"
                        className="strip-image"
                        loading="lazy"
                    />
                </div>
            </div> */}
        </div>
    </>
}

export default HomeFooter;