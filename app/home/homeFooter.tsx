"use client";

import React from "react";
import Image from "next/image";
import cx from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import greenBg from 'public/assets/greenBg.svg';
import creatorsImg from 'public/assets/creators.png';
import footerStrip from 'public/assets/footerStrip.svg'

// Navigation assets
import homeDefault from 'public/assets/home_default.svg';
import homeActive from 'public/assets/home_Active.svg';
import mediakitDefault from 'public/assets/mediakit_default.svg';
import mediakitActive from 'public/assets/mediakit_active.svg';
import moreDefault from 'public/assets/More_default.svg';
import moreActive from 'public/assets/More_active.svg';

import StarSpinner from "./StarSpinner";
import styles from "./home.module.css";

const BottomNavbar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/home') {
            return pathname === '/home' || pathname === '/';
        }
        if (path === '/media-kit') {
            return pathname.startsWith('/media-kit');
        }
        if (path === '/more') {
            return pathname === '/more';
        }
        return false;
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center py-2 shadow-md md:hidden">
            <Link href="/home" className="flex flex-col items-center text-xs hover:text-black">
                <Image
                    src={isActive('/home') ? homeActive : homeDefault}
                    alt="Home"
                    width={22}
                    height={22}
                />
                <span className={cx("mt-1", isActive('/home') ? "text-black font-medium" : "text-gray-700")}>
                    Home
                </span>
            </Link>
            <Link href="/media-kit" className="flex flex-col items-center text-xs hover:text-black">
                <Image
                    src={isActive('/media-kit') ? mediakitActive : mediakitDefault}
                    alt="MediaKit"
                    width={22}
                    height={22}
                />
                <span className={cx("mt-1", isActive('/media-kit') ? "text-black font-medium" : "text-gray-700")}>
                    MediaKit
                </span>
            </Link>
            <Link href="/more" className="flex flex-col items-center text-xs hover:text-black">
                <Image
                    src={isActive('/more') ? moreActive : moreDefault}
                    alt="More"
                    width={22}
                    height={22}
                />
                <span className={cx("mt-1", isActive('/more') ? "text-black font-medium" : "text-gray-700")}>
                    More
                </span>
            </Link>
        </nav>
    );
};

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