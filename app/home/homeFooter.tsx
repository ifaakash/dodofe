"use client";

import React from "react";
import Image from "next/image";
import cx from "classnames";

import greenBg from 'public/assets/greenBg.svg';
import creatorsImg from 'public/assets/creators.png';
import footerStrip from 'public/assets/footerStrip.svg'

import StarSpinner from "./StarSpinner";
import styles from "./home.module.css";

const HomeFooter = () => {

    return <div className="mb-4 pt-16 bg-white relative">
        <div className="mx-4 text-left">
            <span className="text-sm font-normal">Super app for</span><br />
            <span className="text-4xl font-bold">Creators..!</span><br />

            <Image
                width={120}
                height={20}
                src={creatorsImg}
                alt="creators"
                className="mt-6"
            />
            <span className="text-sm font-normal">100+ Creators Onboarded...</span><br />
        </div>

        <div className="absolute right-2 mb-2 bottom-20">
            <StarSpinner />
        </div>

        <Image
            height={100}
            src={greenBg}
            layout="responsive"
            alt="green bg"
            className="mt-4 w-full"
            style={{ marginBottom: '-20px' }}
        />

        <div className={styles.movingStripWrapper} >
            <div className={styles.movingStrip} >
                <Image
                    height={100}
                    src={footerStrip}
                    layout="responsive"
                    alt="green bg"
                    className={cx('mt-4 w-full', styles.stripImage)}
                />
                <Image
                    height={100}
                    src={greenBg}
                    layout="responsive"
                    alt="green bg duplicate"
                    className="strip-image"
                />
            </div>
        </div>
    </div>
}

export default HomeFooter;