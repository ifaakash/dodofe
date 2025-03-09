'use client'
import React from 'react'
import LoaderAnimation from 'public/animations/loader.json'
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import useLoaderVisibility from 'hooks/useLoaderVisibility'
import dynamic from 'next/dynamic';

const CircleLoader = () => {
    const { isVisible, showOverlay } = useLoaderVisibility();

    if (!isVisible) return null;

    return (
        showOverlay ?
            <div className="fixed overflow-hidden inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Lottie
                    animationData={LoaderAnimation}
                    loop={true}
                    className='w-40 h-40'
                />
            </div> :
            <div className="flex items-center absolute top-0 left-0 justify-center h-screen">
                <Lottie
                    animationData={LoaderAnimation}
                    loop={true}
                    className='w-40 h-40'
                />
            </div>
    )
}

export default CircleLoader