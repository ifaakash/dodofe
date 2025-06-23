"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { ScreenProps } from "./types";

import { getMetaTags, isUserLoggedIn } from "utils";
import { usePathname, useRouter } from "next/navigation";
import { getRouteGuardDetails } from "./routeGuard";
import { ROUTE_CONSTANTS, ROUTE_TYPE } from "@utils/constants";

const Screen: React.FC<ScreenProps> = ({
    className,
    children,
    childrenClassName,
    seoTitle = "",
    title = "",
    desc = "",
    noIndex = true,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const routeGuardDetail = getRouteGuardDetails();
    const [isMounted, setIsMounted] = useState(false);

    const onRefreshClick = useCallback(() => {
        window.location.reload();
    }, []);

    const getPageTitle = () => {
        if (seoTitle) {
            return seoTitle;
        }

        if (title) {
            return title + " | Dodo";
        }

        return "Dodo";
    };

    const getMetaTagsData = () => {
        const data = {
            title: getPageTitle(),
            desc: desc || seoTitle || "",
            noIndex: noIndex,
            routeName: pathname || "",
        };

        return getMetaTags(data);
    };

    useEffect(() => {
        setIsMounted(true);
        if (isUserLoggedIn() && routeGuardDetail === ROUTE_TYPE.RESTRICTED) {
            router.push(ROUTE_CONSTANTS.HOME);

            return;
        }

        if (!isUserLoggedIn() && routeGuardDetail === ROUTE_TYPE.PRIVATE) {
            router.push(ROUTE_CONSTANTS.LOGIN);

            return;
        }
    }, []);

    // Return null or a loading state until client-side rendering is ready
    if (!isMounted) {
        return <div className="min-h-screen bg-theme-3"></div>;
    }

    return (
        <div className={cx('overflow-hidden', className)}>
            {getMetaTagsData()}
            < div className={cx(childrenClassName)} > {children}</div >
        </div >
    );
};

export default Screen;
