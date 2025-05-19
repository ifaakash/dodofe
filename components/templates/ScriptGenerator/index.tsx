"use client";
import React, { useState } from "react";
import { generateScript } from "api/services";
import { Header } from "@components/molecules/Header";
import ReactMarkdown from "react-markdown";

const ScriptGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [script, setScript] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateScript = async () => {
        setLoading(true);
        setError('');
        try {
            const generatedScript = await generateScript({ prompt, category: 'comedy' });

            setScript(generatedScript?.content || 'Sorry, No content generated!');
        } catch (error) {
            console.error('Error generating script:', error);
            setError('Failed to generate script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Script Generator ✨" />
            <div className="p-6 mt-16 max-w-xl mx-auto border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Write a funny ad script for a pizza company run by cats..."
                    rows={5}
                    cols={50}
                    className="w-full p-4 border-2 border-black rounded-none font-mono bg-[#f5f5f5] shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                    onClick={handleGenerateScript}
                    disabled={loading}
                    className={`w-full p-4 mt-4 border-2 border-black text-black font-bold rounded-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${loading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-yellow-300 hover:bg-yellow-400 active:translate-x-[2px] active:translate-y-[2px]'
                        }`}
                >
                    {loading ? 'Generating...' : 'Generate Script'}
                </button>
                {error && (
                    <div className="text-red-600 mt-4 font-bold border-2 border-black bg-red-100 p-2 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                        {error}
                    </div>
                )}
                {script && (
                    <div className="mt-6 whitespace-pre-wrap border-2 border-black bg-[#fefefe] p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        <h3 className="font-bold text-lg mb-2 border-b-2 border-black pb-1">
                            Generated Script:
                        </h3>

                        <ReactMarkdown >
                            {script}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </>

    );
};

export default ScriptGenerator;