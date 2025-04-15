"use client";

import styles from "./coins.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userProfileImg from "public/assets/userProfile.png";
import coinBg from "public/assets/coinBg.png";
import noUserDp from "public/assets/noUserDp.png";
// import footerImg from "public/assets/footerImg.png";
import engagementCalc from "public/assets/engagementCalc.png";
import priceCalc from "public/assets/priceCalc.png";
import copy from "public/icons/copy.svg";
import sideBarIcon from "public/icons/sideBarIcon.svg";
import dodoCoinIcon from "public/icons/dodoCoin.svg";
import coinDebit from "public/icons/coin_debit.svg";
import coinCredit from "public/icons/coin_credit.svg";
import whiteLeftArrow from "public/icons/whiteLeftArrow.svg";

import { useRouter } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { useEffect, useState } from "react";
import Screen from "@components/molecules/Screen";
import { createUserBlock, getUserBlocks, getUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { handleNativeBackButton, isEmpty, isWebview } from "@utils/index";
import { toast } from "react-toastify";
import Sidebar from "@components/molecules/Sidebar";
import CtaSection from "@components/molecules/CtaSection";
import Card from './Card';
import CardContent from './CardContent';

import PendingTick from "public/icons/PendingTick.svg";
import CompletedTick from 'public/icons/CompletedTick.svg'

const milestones = [
    {
        coins: 200,
        status: 'Completed',
        title: 'Join the DodoClub',
        description: 'Sign up today',
        completed: true,
    },
    {
        coins: 30,
        status: 'Pending',
        title: 'Get 5 coins extra',
        description: 'Get 30 coins after every 5 invoices',
        completed: false,
    },
    // {
    //     coins: 100,
    //     status: 'Pending',
    //     title: '20 invoices',
    //     description: 'Create and track your invoicing and earn coins.',
    //     completed: false,
    // },
    {
        coins: 100,
        status: 'Pending',
        title: 'Hit 5,000 Views',
        description: 'Boost your visibility and watch the coins roll in.',
        completed: false,
    },
];

interface ICoinTransaction {
    userId: string;
    amount: number;
    transactionType: 'SPENT' | 'EARNED';
    description: string;
    milestoneType?: string;
    metadata?: Record<string, any>;
    createdAt: string;
}

const dummyCoinHistory: ICoinTransaction[] = [
    {
        userId: 'user123',
        amount: 200,
        transactionType: 'EARNED',
        description: 'Login',
        milestoneType: 'Sign Up',
        metadata: { date: '10:00 | 5th Dec, 2024' },
        createdAt: new Date().toISOString(),
    },
    {
        userId: 'user456',
        amount: 50,
        transactionType: 'SPENT',
        description: 'Calculator Tool',
        metadata: { date: '10:00 | 2nd Dec, 2024' },
        createdAt: new Date().toISOString(),

    }
];

export default function Coins() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({} as any);
    const [coinHistory, setCoinHistory] = useState(dummyCoinHistory);
    const [coinsCount, setCoinsCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const dodoPageDetail = userDetails?.dodoPages?.[0];
    const [activeTab, setActiveTab] = useState('milestone');


    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleBack = (event: MessageEvent) => handleNativeBackButton(event, () => router.back());

    useEffect(() => {
        if (isWebview()) {
            document.addEventListener("message", handleBack);
        }

        return () => {
            if (isWebview()) {
                document.removeEventListener("message", handleBack);
            }
        };
    }, [router]);

    useEffect(() => {
        if (userId) {
            getUserDetails(userId).then((res) => {
                setUserDetails(res?.user);

                if (res?.user?.coinTransactions) {
                    setCoinHistory(res?.user?.coinTransactions)
                    setCoinsCount(res?.user?.dodoCoins || 0)
                }
            });
        }
    }, [userId]);

    if (!isMounted) {
        return null;
    }

    const getHeader = () => {
        return (
            <div className="h-16 flex fixed flex-row items-center w-full bg z-50">
                <Image
                    height={20}
                    width={20}
                    src={whiteLeftArrow}
                    alt="back arrow"
                    className="ml-4"
                    onClick={() => {
                        router.back()
                    }}
                />

                <div className="flex flex-row items-center ml-2">
                    <span className="text-sm clr-grey font-bold">

                    </span>
                </div>
            </div>
        );
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);

        const time = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const day = date.getDate();
        const ordinal = (n) => {
            if (n > 3 && n < 21) return `${n}th`;
            switch (n % 10) {
                case 1: return `${n}st`;
                case 2: return `${n}nd`;
                case 3: return `${n}rd`;
                default: return `${n}th`;
            }
        };

        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${time} | ${ordinal(day)} ${month}, ${year}`;
    }
    
    return (
        <Screen>
            <div className="text-center">
                <div>
                    <div
                        style={{ backgroundImage: `url(${coinBg.src})`, height: 300 }}
                        className="w-full relative bg-cover bg-center"
                    >
                        {getHeader()}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                            <p className="text-lg mb-2">you have</p>
                            <h1 className="text-6xl font-bold">{coinsCount}</h1>
                            <div className="mt-2 px-4 py-1 border border-white rounded-full">
                                <p className="text-sm">1 coin = ₹1</p>
                            </div>
                            <div className="flex flex-column absolute-center mt-4">
                                <Image src={dodoCoinIcon} alt="coin" width={24} height={24} />
                                <p className="text-xl font-semibold ml-1">
                                    dodo<span className="text-green-500">{coinsCount <= 1 ? 'coin' : 'coins'}</span></p>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{ position: 'relative', top: '-40px', minHeight: 'calc(100vh - 260px)' }}
                        className={cx(
                            "w-full px-4 rounded-t-2xl bg-[#EAE9EC]",
                            styles.lowerDiv
                        )}
                    >
                        <div className="p-4 max-w-md mx-auto">
                            <div className="flex mb-4 gap-1">
                                <Button
                                    text="Milestone"
                                    btnColor={activeTab === 'milestone' ? 'theme-1' : 'white'}
                                    onClick={() => setActiveTab('milestone')}
                                    className={`w-1/2 py-2 ${activeTab === 'milestone' ? 'bg-black text-white' : 'bg-white text-black !important'
                                        } border border-black rounded-l-xl`}
                                />
                                <Button
                                    text="Coin History"
                                    btnColor={activeTab === 'coin-history' ? 'theme-1' : 'white'}
                                    onClick={() => setActiveTab('coin-history')}
                                    className={`w-1/2 py-2 ${activeTab === 'coin-history' ? 'bg-black text-white' : 'bg-white text-black !important'
                                        } border border-black rounded-r-xl`}
                                />

                            </div>

                            {activeTab === 'milestone' && (
                                <div className="space-y-4">
                                    {milestones.map((milestone, index) => (
                                        <Card key={index} className={`p-4 flex items-center gap-4 bg-[] rounded-[14px] shadow  ${milestone.completed ? 'border-brandPrimary border-2' : 'border-gray-300 border-[1px]'}`}>
                                            <div className={`flex flex-col items-center min-w-24 ${milestone.completed ? 'bg-green-100' : 'bg-[#FDF1CE]'} p-2 rounded-xl`}>
                                                <div className="flex items-center gap-1">
                                                    <Image src={dodoCoinIcon} alt="coin" width={20} height={20} />
                                                    <span className="text-black font-bold">{milestone.coins}</span>
                                                </div>
                                                <span className={`px-2 py-1 text-[8px] rounded-full flex items-center gap-1 font-medium ${milestone.completed ? 'bg-green-500 text-white' : 'bg-[#FED212] text-black'}`}>
                                                    {
                                                        milestone.completed ? <Image src={CompletedTick} alt='err' /> : <Image src={PendingTick} alt='err' />
                                                    }  
                                                    {milestone.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-semibold text-black text-start">{milestone.title}</h3>
                                                <p className="text-gray-500 text-xs text-start">{milestone.description}</p>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'coin-history' && (

                                isEmpty(coinHistory) ?
                                    <div className="mt-12">No coin history</div> :

                                    <div className="space-y-4">
                                        {coinHistory.map((transaction, index) => (
                                            <Card key={index} className="p-4 flex justify-between items-center bg-white rounded-xl shadow">
                                                <div className="flex justify-between w-full items-center">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <div className="font-medium text-start leading-5">{transaction.description}</div>
                                                        <div className="text-xs">{formatDateTime(transaction.createdAt)}</div>
                                                    </div>

                                                    <div className="flex flex-col items-end">
                                                        <div className="font-semibold">{transaction.amount}</div>
                                                        <div className="text-xs flex">
                                                            <span>{transaction.transactionType === "EARNED" ? 'CREDITED' : 'Debited'}</span>
                                                            {
                                                                transaction.transactionType === "EARNED" ? (
                                                                    <Image src={coinCredit} alt="coin" width={16} height={16} className="ml-1" />
                                                                ) : (
                                                                    <Image src={coinDebit} alt="coin" width={16} height={16} className="ml-1" />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isMounted && <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}        </Screen>
    );
}
