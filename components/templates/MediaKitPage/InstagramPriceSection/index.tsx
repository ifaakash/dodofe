"use client";
import React from 'react';

interface PriceData {
    type: string;
    price: string;
    description?: string;
}

interface InstagramPriceSectionProps {
    prices?: PriceData[];
}

const InstagramPriceSection: React.FC<InstagramPriceSectionProps> = ({
    prices = [
        {
            type: 'Reel',
            price: '₹25,000',
            description: 'Per post with brand mention'
        },
        {
            type: 'Story',
            price: '₹15,000',
            description: 'Per story with swipe up'
        },
        {
            type: 'Post',
            price: '₹20,000',
            description: 'Per carousel post'
        }
    ]
}) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[#FF4085] font-bold text-xl">Instagram</span>
                    <span className="text-gray-400 uppercase text-xl tracking-wider">PRICE</span>
                </div>
                <button className="text-[#FF4085]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </button>
            </div>

            {/* Price Cards */}
            <div className="grid grid-rows-3 gap-4">
                {prices.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#47466A] font-semibold">{item.type}</span>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                {item.type === 'Reel' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#FF4085]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25h9.75m-9.75 0c-.621 0-1.125-.504-1.125-1.125M18 18.375c0 .621-.504 1.125-1.125 1.125M18 13.125v1.5m0-1.5v-1.5m0 1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125V9.75M18 9.75c0-.621.504-1.125 1.125-1.125M18 9.75c0-.621-.504-1.125-1.125-1.125M18 9.75v1.5m0-1.5v-1.5m1.125 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5m2.25-1.5v1.5c0 .621-.504 1.125-1.125 1.125M19.125 12h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5m0-1.5v-1.5m0 1.5c0-.621.504-1.125 1.125-1.125h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5m0-1.5v-1.5m0 1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125V9.75M18 9.75c0-.621.504-1.125 1.125-1.125M18 9.75c0-.621-.504-1.125-1.125-1.125M18 9.75v1.5m-1.125-1.5c.621 0 1.125.504 1.125 1.125v1.5m0-1.5v-1.5m1.125 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5m2.25-1.5v1.5c0 .621-.504 1.125-1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125-.504 1.125-1.125v-1.5m0 1.5v1.5c0 .621-.504 1.125-1.125 1.125" />
                                    </svg>
                                )}
                                {item.type === 'Story' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#2196F3]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                    </svg>
                                )}
                                {item.type === 'Post' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#4CAF50]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-[#47466A] mb-2">{item.price}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramPriceSection; 