"use client";
import React, { useState } from "react";
import { generateContent } from "api/services";
import { Header } from "@components/molecules/Header";

const ScriptGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [script, setScript] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateScript = async () => {
        setLoading(true);
        setError('');
        try {
            // const generatedScript = await generateContent(prompt);
            setScript('No content generated.');
        } catch (error) {
            console.error('Error generating script:', error);
            setError('Failed to generate script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Script Generator" />
            <div className="p-4 mt-16 max-w-lg mx-auto">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    rows={5}
                    cols={50}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleGenerateScript}
                    disabled={loading}
                    className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {loading ? 'Generating...' : 'Generate Script'}
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="mt-4">
                    <h3 className="font-semibold">Generated Script:</h3>
                    <pre className="bg-gray-100 p-2 rounded">{script}</pre>
                </div>
            </div>
        </>
    );
};

export default ScriptGenerator;