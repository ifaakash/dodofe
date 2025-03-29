'use client'
import React, { useEffect, useRef } from 'react'
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTE_CONSTANTS } from '@utils/constants';
import CtaSection from '@components/molecules/CtaSection';
import { Card } from '@utils/uiUtils';
import styles from '../mediakit.module.css';
import otherFeatures from "public/assets/otherFeatures.png";
import invoiceIcon from "public/assets/invoice.png";
import engagementCalc from "public/assets/content.png";
import priceCalc from "public/assets/priceEstimate.png";
import mediakitIcon from "public/assets/mediakit.png";
import NewButton from '@components/atoms/Button/NewButton';
import crossBg from "public/icons/crossBg.svg";
import { useState } from 'react';
import ManOnSofa from "public/assets/ManOnSofa.png"
import { Header } from '@components/molecules/Header';
import Screen from '@components/molecules/Screen';
import HomeFooter from '@app/home/homeFooter';
import dodoCoinIcon from "public/icons/dodoCoin.svg";
import gotoIcon from "public/icons/goto.svg";
import sideBarIcon from "public/icons/sideBarIcon.svg";


const MediaKitWaitlist = () => {
    const router = useRouter();
    const [mainContentVisible, setMainContentVisible] = useState(false);
    const [blurAmount, setBlurAmount] = useState(0);
    const scrollAnimationFrame = useRef<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);



    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            if (scrollAnimationFrame.current === null) {
                scrollAnimationFrame.current = requestAnimationFrame(() => {
                    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                    let blurValue = Math.min((scrollProgress + 10) / 10, 10);

                    if (scrollProgress === 0) {
                        blurValue = 0;
                    }

                    setBlurAmount(blurValue);
                    scrollAnimationFrame.current = null;
                });
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (scrollAnimationFrame.current !== null) {
                cancelAnimationFrame(scrollAnimationFrame.current);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handleBackToHomepage = () => {
        router.push(ROUTE_CONSTANTS.HOME);
    }




    return (
        <Screen>
            <div className={cx("pt-8 text-center", styles["transition-wrapper"], mainContentVisible && styles.visible)}
                style={{ backgroundImage: `url(${crossBg.src})`, backgroundAttachment: 'fixed', }}>
                <div className="fixed w-full pt-5"
                    style={{
                        filter: `blur(${blurAmount}px)`,
                        transition: 'filter 0.15s ease-out',
                    }}
                    onClick={(e) => {
                        if (blurAmount > 0) {
                            e.stopPropagation(); // Prevent inside clicks
                            setBlurAmount(0);
                            if (window) {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }
                    }}
                >
                    <div className="mx-4 flex flex-col items-center gap-5">
                        <div className='flex flex-col items-center gap-2 text-2xl font-black'>
                            <span className='leading-none'>🎉You’re on the</span>
                            <span className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none" >
                                Waitlist!</span>
                        </div>

                        <div className='text-sm text-center max-w-[310px]'>
                            🚀 You’re now one step closer to accessing Dodo Media Kit before anyone else.
                        </div>

                        <div>
                            <Image src={ManOnSofa} alt='man-on-sofa' height={240} width={240} />
                        </div>
                    </div>

                </div>


                <div
                    className={cx(
                        "w-full px-4 rounded-t-[32px] bg-white",
                        styles.lowerDiv,
                    )}
                >
                    <Image
                        height={53}
                        width={251}
                        src={otherFeatures}
                        alt="user profile"
                        className="mx-auto mb-6 mt-3"
                        priority
                    />

                    <div className="absolute-center flex-col">
                        <CtaSection
                            onClick={() => { }}
                            bgColor="var(--yellow)"
                            img={invoiceIcon}
                            title="Your Invoices"
                            description="Create stunning digital invoices in a few seconds"
                        />

                        <div className="flex flex-row justify-between w-full gap-x-4 my-6">
                        <Card
                                title="Script Generator"
                                description=""
                                icon={engagementCalc}
                                onClick={() => router.push(ROUTE_CONSTANTS.SCRIPT_GENERATOR)}
                                bgColor="var(--light-orange)"
                                bgColorGo="var(--orange)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                            <Card
                                title="IG Price Estimator"
                                description=""
                                icon={priceCalc}
                                bgColor="var(--neon-purple)"
                                onClick={() => router.push(ROUTE_CONSTANTS.PRICE_CALCULATOR)}
                                bgColorGo="var(--purple)"
                                className="flex-1 max-w-[calc(50%-0.5rem)]"
                            />
                        </div>
                    </div>
                    <div className={cx(
                        "bottom-0 py-4 fixed justify-center w-[90%]",
                    )}
                    // style={isEmpty(clientDetails) ? { width: '80%' } : { width: '90%' }
                    // }
                    >
                        <NewButton
                            size="large"
                            variant="primary"
                            className="w-full"
                            onClick={handleBackToHomepage}
                        >
                            Back to Homepage
                        </NewButton>
                    </div>
                </div>
            </div>
        </Screen>
    )
}

export default MediaKitWaitlist