'use client'
import React from 'react'
import SplashScreenAnimation from 'public/animations/splashScreen.json'
import Lottie from 'lottie-react'

const SplashScreen = () => {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-brandPrimary">
            <Lottie
                animationData={SplashScreenAnimation}
                loop={true}
                style={{ width: '100%', height: '100vh' }}
            />
        </div>

    )
}

export default SplashScreen