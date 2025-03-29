'use client'
import AnalyticsMain from '@components/molecules/dodoPage/analytics/AnalyticsMain';
import React, { useState, useEffect, useCallback } from "react";
import AnalyticsHeader from '@components/molecules/dodoPage/analytics/AnalyticsHeader'
import NewButton from '@components/atoms/Button/NewButton';
import { useRouter, useParams } from 'next/navigation';
import { useDodoPageAnalyticsView } from "hooks/useDodoPageAnalytics";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import { getAnalyticsDataByDodoPageId, getDodoPageByURL } from "api";
import { AnalyticsData } from "types";
const AnalyticsPage = () => {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState("week");
    const { dodopageUrl } = useParams();
    const [dodoPageDetails, setDodoPageDetails] = useState<any>(null);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch dodo page details to get the dodoPageId only once
    useEffect(() => {
        let isMounted = true;

        if (dodopageUrl && !dodoPageDetails) {
            getDodoPageByURL(dodopageUrl as string).then((res) => {
                if (isMounted && res.success && res.dodoPage) {
                    setDodoPageDetails(res.dodoPage);
                    setIsLoading(false);
                } else if (isMounted) {
                    setError("Invalid Dodo Page URL");
                    setIsLoading(false);
                }
            });
        }

        return () => {
            isMounted = false;
        };
    }, [dodopageUrl, dodoPageDetails]);

    // Use our custom analytics hook with a stable dodoPageId
    const dodoPageId = dodoPageDetails?.id;
    console.log("dodoPageId", dodoPageId);

    const {
        analyticsData,
        fetchAnalyticsData,
    }: {
        analyticsData: AnalyticsData;
        fetchAnalyticsData: (timeRange: string) => void;
    } = useDodoPageAnalyticsView(dodoPageId);
    console.log("analyticsData in analytics page", analyticsData);

    // Memoize the fetch function to prevent it from changing on every render
    const fetchData = useCallback(() => {
        if (dodoPageId) {
            fetchAnalyticsData(timeRange as any);
        }
    }, [dodoPageId, timeRange, fetchAnalyticsData]);

    // Fetch analytics data when dodoPageId is available and timeRange changes
    useEffect(() => {
        if (!dodoPageId) return;

        fetchData();

        // Don't include fetchData in dependencies to prevent infinite loop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dodoPageId, timeRange]);

    const handleTimeRangeChange = (range: string) => {
        setTimeRange(range);
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <a
                        href="/"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Go Back Home
                    </a>
                </div>
            ) : (
                <div>
                    <AnalyticsHeader url={dodopageUrl as string} />

                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <div className="text-[#979EAD] leading-none">
                                Your DODOpage
                            </div>
                            <div className="text-[#3D4966] font-bold text-[32px] leading-none">
                                Analytics
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 text-center py-5">
                                {error}
                            </div>
                        ) : (
                            <AnalyticsMain
                                timeRange={timeRange}
                                setTimeRange={handleTimeRangeChange}
                                data={
                                    analyticsData || {
                                        totalViews: 0,
                                        uniqueVisitors: 0,
                                        averageDuration: 0,
                                        topReferrers: [],
                                        blockInteractions: [],
                                        viewsByDate: [],
                                        deviceBreakdown: [],
                                    }
                                }
                            />
                        )}
                    </div>

                    <div className="px-5 pt-20 flex justify-center items-center text-center text-sm">
                        Full customised Analytics <br />
                        coming soon...
                    </div>

                    <div className="bottom-0 fixed mb-4 px-4 w-full">
                        <NewButton
                            size="large"
                            variant={"primary"}
                            onClick={() => router.push(`/dodo/${dodopageUrl}`)}
                            className="w-full"
                        >
                            Okay
                        </NewButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsPage;