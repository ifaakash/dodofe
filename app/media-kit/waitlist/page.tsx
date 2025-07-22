'use client'
import React, { useEffect, useRef } from 'react'
import cx from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from '@utils/constants';
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
import { getMediaKitByInstaId, getUserDetails } from 'api/services';
import { loadState } from '@utils/localStorage';


const MediaKitWaitlist = () => {
    const router = useRouter();
    const [mainContentVisible, setMainContentVisible] = useState(false);
    const [blurAmount, setBlurAmount] = useState(0);
    const scrollAnimationFrame = useRef<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [instaId, setInstaId] = useState("");
    // Initial state: show '-' until API returns a valid number
    const [waitlist, setWaitlist] = useState<'-' | number>('-');
    const [initialWaitlist, setInitialWaitlist] = useState<'-' | number>('-');
    const [waitlistCreatedAt, setWaitlistCreatedAt] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const userId = loadState(STORAGE_CONSTANTS.userId)

    function calculateQueueDecay(
        initialValue: number,  // Random starting number (N0)
        startTime: number,     // Start timestamp (e.g., Date.now())
        currentTime: number    // Current timestamp
    ): number {
        if (initialValue <= 0) {
            throw new Error("Initial value must be positive.");
        }
        const decayRate = 0.001;  // Constant lambda (λ) per second for moderate decay
        const elapsedTime = (currentTime - startTime) / 1000;  // Convert ms to seconds; adjust as needed
        return Math.ceil(initialValue * Math.exp(-decayRate * elapsedTime));
    }

    // Deterministic waitlist calculation
    function calculateWaitlist(queueNumber: number, waitlistCreatedAt: number, currentTime: number) {
        return calculateQueueDecay(queueNumber, waitlistCreatedAt, currentTime);
    }

    useEffect(() => {
        async function fetchWaitlistData() {
            try {
                const response = await getUserDetails(userId as string);
                const queueNumber = response?.user?.mediaKit?.queueNumber;
                const createdAt = new Date(response?.user?.mediaKit?.waitlistCreatedAt || new Date()).getTime();

                if (response?.user && response?.user?.mediaKit?.isVerified) {
                    router.push(ROUTE_CONSTANTS.MEDIA_KIT_CONSOLE);
                }

                if (typeof queueNumber === 'number' && !isNaN(queueNumber)) {
                    setInitialWaitlist(queueNumber);
                    setWaitlist(queueNumber);
                    setWaitlistCreatedAt(createdAt);
                    setInstaId(response?.user?.mediaKit?.instaId);
                    console.log('API data loaded:', { queueNumber, createdAt });
                } else {
                    setInitialWaitlist('-');
                    setWaitlist('-');
                    setWaitlistCreatedAt(null);
                    console.log('API returned invalid queueNumber, showing dash');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Fallback to dash
                setInitialWaitlist('-');
                setWaitlist('-');
                setWaitlistCreatedAt(null);
                console.log('Using fallback dash');
            }
        }

        if (userId) {
            fetchWaitlistData();
        }
    }, [userId]);

    useEffect(() => {
        // Only start interval if we have a valid initialWaitlist and waitlistCreatedAt
        if (typeof initialWaitlist === 'number' && waitlistCreatedAt) {
            intervalRef.current = setInterval(() => {
                const currentTime = new Date().getTime();
                const newWaitlistValue = calculateWaitlist(
                    initialWaitlist,
                    waitlistCreatedAt,
                    currentTime
                );
                setWaitlist(newWaitlistValue);
            }, 2000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [initialWaitlist, waitlistCreatedAt]);

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
                        <div className='flex items-center gap-2 text-2xl font-bold'>
                            <span>🎉You're on the</span>
                            <span>
                                Waitlist!</span>
                        </div>

                        <div className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent animate-slide-in">
                            #{waitlist}
                        </div>
                        <style jsx>{`
                                @keyframes slide-in {
                                    0% {
                                        transform: translateY(-100%);
                                        opacity: 0;
                                    }
                                    100% {
                                        transform: translateY(0);
                                        opacity: 1;
                                    }
                                }
                                @keyframes fade-in {
                                    0% {
                                        opacity: 0;
                                    }
                                    100% {
                                        opacity: 1;
                                    }
                                }
                                .animate-slide-in {
                                    animation: slide-in 0.5s ease-out;
                                }
                                .animate-fade-in {
                                    animation: fade-in 1s ease-in-out;
                                }
                            `}</style>
                        <p className="text-gray-600 mt-4">
                            ⁠🎉 Just a few ahead of you! Your Dodo Media Kit access is loading...
                        </p>


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
                    style={{
                        top: '360px'
                    }}
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
                            bgColor="var(--yellow)"
                            img={invoiceIcon}
                            title="Your Invoices"
                            description="Create stunning digital invoices in a few seconds"
                            onClick={() => router.push(ROUTE_CONSTANTS.INVOICE)}
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
                                bgColorGo="var(--purple)"
                                onClick={() => router.push(ROUTE_CONSTANTS.PRICE_CALCULATOR)}
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