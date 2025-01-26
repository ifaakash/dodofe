"use client";

import React from "react";
import Image from "next/image";

import greenBg from 'public/assets/greenBg.svg'

const HomeFooter = () => {

    return <div className="mb-4 pt-16 bg-white">
        <div className="mx-4 text-left">
            <span className="text-sm font-normal">Super app for</span><br />
            <span className="text-4xl font-bold">Creators..!</span><br />

            <span className="text-sm font-normal">100+ Creators Onboarded...</span><br />
        </div>

        <Image
            height={100}
            src={greenBg}
            layout="responsive"
            alt="user profile"
            className="mt-4 w-full"
            style={{ marginBottom: '-20px' }}
        />
    </div>
}

export default HomeFooter;