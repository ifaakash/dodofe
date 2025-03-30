import Image from "next/image";
import { SEPARATOR } from "./constants";
import cx from "classnames";
import { ROUTE_CONSTANTS } from "@utils/constants";
import Router from "next/navigation";
import LeftArrow from "public/icons/leftArrow.svg";

import lineSeperator from "public/icons/line.svg";
import solidLineSeperator from "public/icons/solidLine.svg";
import orSeperator from "public/icons/or.svg";

export const getSeperatorOptionsUI = (seperator: string) => {
    switch (seperator) {
        case SEPARATOR.LINE:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={lineSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
        case SEPARATOR.SOLID:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={solidLineSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
        case SEPARATOR.OR:
            return (
                <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={orSeperator}
                    alt="user profile"
                    className="my-2"
                />
            );
    }
};


export const getLinkBoxUI = (data: any, badgeColor: string) => {
    return (
        <>
            <Image
                height={44}
                width={44}
                src="https://picsum.photos/seed/picsum/200/200"
                alt="user profile"
                className="mr-3 rounded-xl"
            />
            <div>
                <span className="ml-3 clr-dark-text font-normal text-sm">
                    {data?.description}
                </span>
                {badgeColor && (
                    getBadgeUI(data?.badge?.text, badgeColor)
                )}
            </div>
        </>
    )
}

export const getBadgeUI = (badgeText: string, badgeColor: string) => {
    return (
        <div className="flex">
            <div
                className="mt-1 ml-2 inline-block clr-text px-3 py-1 rounded-xl font-semibold text-white whitespace-nowrap self-start"
                style={{ backgroundColor: badgeColor, fontSize: '10px' }}
            >
                {badgeText}
            </div>
        </div>
    )
}

export function Card({ title, description, icon, bgColor, bgColorGo, className, onClick }) {
    return (
        <div className={`rounded-2xl p-[14px] h-80 flex flex-col justify-between ${className}`} style={{ backgroundColor: bgColor }} onClick={onClick}>
            <div className="px-2">
                <h1 className="text-lg text-left font-bold pt-2 leading-none">{title}</h1>

                <p className="text-xs text-left leading-[16px] mb-5">{description}</p>

            </div>
            <div className="flex justify-between items-end">
                <Image
                    height={70}
                    width={70}
                    src={icon}
                    alt="calc"
                    style={{ width: 'auto', height: 'auto' }}
                />
                <div className="bg-white flex items-center p-2 justify-center -rotate-45" style={{ borderRadius: '50%', transform: 'rotate(-45deg)', width: '30px', height: '30px', backgroundColor: bgColorGo }}>
                    →
                </div>
            </div>
        </div>
    );
}