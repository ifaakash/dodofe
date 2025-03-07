"use client"; // Force client-only execution

import React from 'react'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import useLoaderVisibility from 'hooks/useLoaderVisibility'

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const CircleLoader = () => {
    const { isVisible, showOverlay } = useLoaderVisibility();
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('public/animations/loader.json')
            .then((res) => res.json())
            .then((data) => setAnimationData(data));
    }, []);

    if (!isVisible || !animationData) return null;

    return (
        showOverlay ?
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Lottie animationData={animationData} loop className="w-40 h-40" />
            </div> :
            <div className="flex items-center justify-center h-screen">
                <Lottie animationData={animationData} loop className="w-40 h-40" />
            </div>
    );
};

export default CircleLoader;
