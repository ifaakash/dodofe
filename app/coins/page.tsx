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
import { handleNativeBackButton, isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import Sidebar from "@components/molecules/Sidebar";
import CtaSection from "@components/molecules/CtaSection";
import Card from './Card';
import CardContent from './CardContent';


const milestones = [
    {
        coins: 200,
        status: 'Completed',
        title: 'Join the DodoClub',
        description: 'Sign up today',
        completed: true,
    },
    {
        coins: 100,
        status: 'Pending',
        title: 'Dodopage',
        description: 'Add links, social and other in dodopage.',
        completed: false,
    },
    {
        coins: 100,
        status: 'Pending',
        title: '20 invoices',
        description: 'Create and track your invoicing and earn coins.',
        completed: false,
    },
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
}

const dummyCoinHistory: ICoinTransaction[] = [
    {
        userId: 'user123',
        amount: 200,
        transactionType: 'EARNED',
        description: 'Login',
        milestoneType: 'Sign Up',
        metadata: { date: '10:00 | 5th Dec, 2024' }
    },
    {
        userId: 'user456',
        amount: 50,
        transactionType: 'SPENT',
        description: 'Calculator Tool',
        metadata: { date: '10:00 | 2nd Dec, 2024' }
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

    useEffect(() => {
        window.addEventListener("message", (event: MessageEvent) => handleNativeBackButton(event, () => router.back()));

        return () => {
            window.removeEventListener("message", (event: MessageEvent) => handleNativeBackButton(event, () => router.back()));
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
                            "w-full px-4 rounded-t-2xl bg-white",
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
                                        <Card key={index} className="p-4 flex items-center gap-4 bg-white rounded-xl shadow border-2 border-green-500">
                                            <div className="flex flex-col items-center bg-green-100 p-2 rounded-lg">
                                                <div className="flex items-center gap-1">
                                                    <Image src={dodoCoinIcon} alt="coin" width={20} height={20} />
                                                    <span className="text-black font-bold text-xl">{milestone.coins}</span>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${milestone.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                                    {milestone.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-xl font-semibold text-black">{milestone.title}</h3>
                                                <p className="text-gray-500 text-sm">{milestone.description}</p>
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
                                                <div className="flex flex-col items-start">
                                                    <p className="text-xl mb-1">{transaction.description}</p>
                                                    <p className="text-gray-500 text-sm">{transaction.metadata?.date}</p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-2xl font-bold">{transaction.amount}</span>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm">{transaction.transactionType}</span>
                                                        {transaction.transactionType === 'EARNED' && <Image width={24} height={24} src={coinCredit} alt="coin credit" />}
                                                        {transaction.transactionType === 'SPENT' && <Image width={24} height={24} src={coinDebit} alt="coin debit" />}
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
