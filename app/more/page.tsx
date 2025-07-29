"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@components/molecules/Header";
import { ROUTE_CONSTANTS } from "@utils/constants";

// CTA Images
import dodoPageCta from "public/assets/dodopagecta.png";
import connectPlusCta from "public/assets/connectpluscta.png";
import creatorGptCta from "public/assets/creatorgptcta.png";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import CTABanner from "@components/molecules/Banners/CTABanner";

export default function MorePage() {
    const router = useRouter();

    const handleScriptGeneratorNavigation = useCallback(() => {
        const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN);
            return;
        }
        router.push(ROUTE_CONSTANTS.SCRIPT_GENERATOR);
    }, [router]);

    const handlePriceCalculatorNavigation = useCallback(() => {
        router.push(ROUTE_CONSTANTS.PRICE_CALCULATOR);
    }, [router]);

    const handleDodoPageNavigation = useCallback(() => {
        const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";

        if (!userId) {
            router.push(ROUTE_CONSTANTS.LOGIN);
            return;
        }
        // Navigate to dodo page creation or user's existing dodo page
        router.push(ROUTE_CONSTANTS.DODOPAGE);
    }, [router]);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white flex flex-col items-center pt-12 px-4">
                <h1 className="text-2xl font-bold mb-8 text-gray-800">More</h1>

                <div className="w-full max-w-md text-center mb-12">
                    <CTABanner
                        titleHtml={'A Better, Smarter Way to Pitch Brands'}
                        highlightedTitle={'Pitch Brands'}
                        description="Showcase your value with a sleek MediaKit brands want to open."
                        ctaText="Know More"
                        maxWidth={310}
                        onCtaClick={() => router.push(ROUTE_CONSTANTS.MEDIA_KIT)}
                    />
                </div>

                {/* Top Card - Link-in-page */}
                <div
                    className="w-full max-w-md mb-6 cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={handleDodoPageNavigation}
                >
                    <Image
                        src={dodoPageCta}
                        alt="Link-in-page - More than a linktree. It's your digital identity."
                        className="w-full h-auto rounded-2xl"
                        priority
                    />
                </div>

                {/* Bottom Row - Two Cards */}
                <div className="w-full max-w-md flex gap-4">
                    {/* Connect++ Card */}
                    <div
                        className="flex-1 cursor-pointer hover:scale-105 transition-all duration-300"
                        onClick={handleScriptGeneratorNavigation}
                    >
                        <Image
                            src={connectPlusCta}
                            alt="Connect++ - your stage to speak & earn"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>

                    {/* Creator-GPT Card */}
                    <div
                        className="flex-1 cursor-pointer hover:scale-105 transition-all duration-300"
                        onClick={handlePriceCalculatorNavigation}
                    >
                        <Image
                            src={creatorGptCta}
                            alt="Creator-GPT - content idea generator"
                            className="w-full h-auto rounded-2xl"
                        />
                    </div>
                </div>
            </div>
        </>
    );
} 