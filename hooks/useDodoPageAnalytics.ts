import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    recordAnalyticsPageView,
    recordAnalyticsTimeSpent,
    getAnalyticsDataByDodoPageId,
    recordAnalyticsBlockInteraction,
} from "api/services";

interface BlockInteraction {
    blockId: string;
    dodoPageId: string;
    interactionType: "click" | "view" | "scroll";
}

interface AnalyticsData {
    totalViews: number;
    uniqueVisitors: number;
    averageDuration: number;
    topReferrers: Array<{ source: string; count: number }>;
    blockInteractions: Array<{
        blockId: string;
        blockType: string;
        interactionCount: number;
    }>;
    viewsByDate: Array<{ date: string; count: number }>;
    deviceBreakdown: Array<{ device: string; percentage: number }>;
}

export const useDodoPageAnalytics = (dodoPageId: string) => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sessionStartTime = useRef<number>(Date.now());
    const lastActivityTime = useRef<number>(Date.now());
    const timeSpentInterval = useRef<NodeJS.Timeout | null>(null);
    const visitorIdRef = useRef<string>("");
    const sessionIdRef = useRef<string>("");

    // Initialize visitor ID and session ID
    useEffect(() => {
        // Get or create visitor ID using localStorage instead of cookies
        const getOrCreateVisitorId = () => {
            if (typeof window === "undefined") return `visitor-${uuidv4()}`;

            try {
                const storedVisitorId = localStorage.getItem("dodo_visitor_id");
                if (storedVisitorId) return storedVisitorId;

                const newVisitorId = `visitor-${uuidv4()}`;
                localStorage.setItem("dodo_visitor_id", newVisitorId);
                return newVisitorId;
            } catch (e) {
                // In case localStorage is not available (e.g., private browsing)
                return `visitor-${uuidv4()}`;
            }
        };

        visitorIdRef.current = getOrCreateVisitorId();

        // Create a new session ID
        sessionIdRef.current = `${visitorIdRef.current}-${Date.now()}`;

        // Set up activity tracking
        const updateLastActivity = () => {
            lastActivityTime.current = Date.now();
        };

        // Only set up time tracking if we have a dodoPageId
        if (dodoPageId) {
            // Set up interval to record time spent
            timeSpentInterval.current = setInterval(() => {
                const currentTime = Date.now();
                const timeSinceLastActivity =
                    currentTime - lastActivityTime.current;

                // Only record time if user has been active in the last 5 minutes
                if (timeSinceLastActivity < 5 * 60 * 1000) {
                    recordTimeSpent();
                }

                lastActivityTime.current = currentTime;
            }, 30000); // Send time spent data every 30 seconds

            window.addEventListener("mousemove", updateLastActivity);
            window.addEventListener("keydown", updateLastActivity);
            window.addEventListener("scroll", updateLastActivity);
            window.addEventListener("click", updateLastActivity);
        }

        // Clean up
        return () => {
            if (timeSpentInterval.current) {
                clearInterval(timeSpentInterval.current);
            }

            window.removeEventListener("mousemove", updateLastActivity);
            window.removeEventListener("keydown", updateLastActivity);
            window.removeEventListener("scroll", updateLastActivity);
            window.removeEventListener("click", updateLastActivity);
        };
    }, [dodoPageId]);

    // Record page view
    const recordPageView = async (pageId: string) => {
        try {
            const payload = {
                dodoPageId: pageId,
                visitorId: visitorIdRef.current,
                referrer: document.referrer || "direct",
                sessionId: sessionIdRef.current,
                userAgent: navigator.userAgent,
                ipAddress: "", // This will be filled by the server
            };
            console.log("payload", payload);
            const response = await recordAnalyticsPageView(payload);
            console.log("response from record page view", response);
            if (!response.ok) {
                console.error("Failed to record page view");
            }
        } catch (err) {
            console.error("Error recording page view:", err);
        }
    };

    // Record time spent
    const recordTimeSpent = async () => {
        const currentTime = Date.now();
        const timeSpentInSeconds = Math.floor(
            (currentTime - sessionStartTime.current) / 1000
        );

        try {
            const response = await recordAnalyticsTimeSpent({
                dodoPageId,
                visitorId: visitorIdRef.current,
                sessionId: sessionIdRef.current,
                timeSpentInSeconds,
            });

            // Reset the session start time
            sessionStartTime.current = currentTime;
        } catch (err) {
            console.error("Error recording time spent:", err);
        }
    };

    // Track block interaction
    const trackBlockInteraction = async (
        blockInteraction: BlockInteraction
    ) => {
        try {
            const response = await recordAnalyticsBlockInteraction({
                ...blockInteraction,
                visitorId: visitorIdRef.current,
                sessionId: sessionIdRef.current,
            });

            if (!response.ok) {
                console.error("Failed to record block interaction");
            }
        } catch (err) {
            console.error("Error recording block interaction:", err);
        }
    };

    return {
        analyticsData,
        isLoading,
        error,
        trackBlockInteraction,
        visitorId: visitorIdRef.current,
        sessionId: sessionIdRef.current,
    };
};

export const useDodoPageAnalyticsView = (dodoPageId: string) => {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch analytics data
    const fetchAnalyticsData = async (
        timeframe: "day" | "week" | "month" | "year" = "week"
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log("DEBUG -2: dodoPageId", dodoPageId);
            const response = await getAnalyticsDataByDodoPageId(dodoPageId);
            console.log(
                "DEBUG -1: response from fetch analytics data",
                response
            );
            if (!response.success) {
                console.log("DEBUG 0: response not ok", response);
                throw new Error("Failed to fetch analytics data");
            }

            if (response.success) {
                setAnalyticsData(response.data);
                console.log("DEBUG 2: analyticsData", analyticsData);
            } else {
                setError(response.message || "Failed to fetch analytics data");
            }
        } catch (err) {
            console.log("DEBUG 3: error", err);
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        analyticsData,
        isLoading,
        error,
        fetchAnalyticsData,
    };
};
