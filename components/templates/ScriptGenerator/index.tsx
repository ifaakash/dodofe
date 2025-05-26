"use client";
import React, { useEffect, useState } from "react";
import { generateScript, getUserDetails } from "api/services";
import { Header } from "@components/molecules/Header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import dodoCoinIcon from "public/icons/dodoCoin.svg";
import Button from "@components/atoms/Button";

const ScriptGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [script, setScript] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const [coinsCount, setCoinsCount] = useState(0);

    useEffect(() => {
        if (userId) {
            getUserDetails(userId).then((res) => {

                if (res?.user?.coinTransactions) {
                    setCoinsCount(res?.user?.dodoCoins || 0)
                }
            });
        }
    }, [userId]);

    const handleGenerateScript = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        setError('');

        if (coinsCount < 5) {
            setError('You do not have enough coins to generate a script.');
            return;
        }

        try {
            const generatedScript = await generateScript({ prompt, category: 'comedy' });

            setScript(generatedScript?.content || 'Sorry, No content generated!');

            setCoinsCount(coinsCount - 5);
        } catch (error) {
            console.error('Error generating script:', error);
            setError('Failed to generate script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <Header />
                <div
                    className="flex rounded-xl bg-white items-center justify-between px-2 ml-auto mt-6 mr-4"
                    style={{ height: 30, width: 80 }}
                >
                    <Image
                        className="flex-shrink-0"
                        height={18}
                        width={22}
                        src={dodoCoinIcon}
                        alt="dodo coin"
                    />
                    <span className="flex-1 text-center font-bold">
                        {coinsCount ?? 0}
                    </span>
                </div>
            </div>
            <div className="p-6 mt-8 max-w-xl mx-auto">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Make a mock ad where a creator promotes a product they clearly don’t use..."
                    rows={5}
                    cols={50}
                    className="w-full p-4 border border-gray-300 rounded-md font-mono bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                    text={loading ? 'Generating...' : 'Generate Script'}
                    className={`w-full p-4 mt-4 clr-text font-medium rounded-md transition-all`}
                    onClick={handleGenerateScript}
                    btnColor="white"
                />
                {error && (
                    <div className="text-red-600 mt-4 font-medium bg-red-50 p-3 rounded-md">
                        {error}
                    </div>
                )}
                {script && (
                    <div className="mt-6 whitespace-pre-wrap border border-gray-200 bg-white p-4 rounded-md shadow-sm">
                        <h3 className="font-semibold text-lg mb-2 border-b border-gray-200 pb-2">
                            Generated Script:
                        </h3>

                        <ReactMarkdown>
                            {script}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScriptGenerator;