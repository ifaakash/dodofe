"use client"
import Link from "next/link";
import { FileText, Calculator } from "lucide-react";
import { Header } from "@components/molecules/Header";
import { ROUTE_CONSTANTS } from "@utils/constants";

import engagementCalc from "public/assets/content.png";
import priceCalc from "public/assets/priceEstimate.png";
import { Card } from "@utils/uiUtils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";

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


    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
                <h1 className="text-2xl font-bold mb-8">More</h1>
                <div className="flex flex-row justify-between w-full gap-x-4 my-6">
                    <Card
                        title="AI Script Generator"
                        description=""
                        icon={engagementCalc}
                        onClick={handleScriptGeneratorNavigation}
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
        </>
    );
} 