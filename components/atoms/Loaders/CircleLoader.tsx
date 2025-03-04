'use client'
import React from 'react'
import LoaderAnimation from 'public/animations/loader.json'
import Lottie from 'lottie-react'

const CircleLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Lottie
                animationData={LoaderAnimation}
                loop={true}
                className='w-40 h-40'
            />
        </div>

    )
}

export default CircleLoader