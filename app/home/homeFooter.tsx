"use client";

import React from "react";
import Image from "next/image";

import greenBg from 'public/assets/greenBg.svg'
import StarSpinner from "./StarSpinner";

const HomeFooter = () => {

    return <div className="mb-4 pt-16 bg-white relative">
        <div className="mx-4 text-left">
            <span className="text-sm font-normal">Super app for</span><br />
            <span className="text-4xl font-bold">Creators..!</span><br />

            <span className="text-sm font-normal">100+ Creators Onboarded...</span><br />
        </div>

        <div className="absolute right-2 mb-2 bottom-20">
            <StarSpinner />
        </div>

        <Image
            height={100}
            src={greenBg}
            layout="responsive"
            alt="green bg"
            className="mt-4 w-full"
            style={{ marginBottom: '-20px' }}
        />
    </div>
}

export default HomeFooter;