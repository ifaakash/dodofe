import React, { useState } from 'react';

interface CopyBoxProps {
    text: string;
}

const CopyBox: React.FC<CopyBoxProps> = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('https://www.dodopage.com/' + text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="flex justify-between items-center bg-white border border-gray-300 py-2 px-2 rounded-3xl w-full">
            <div className="flex-1 truncate text-sm text-gray-800">{'dodopage.com/' + text}</div>

            <button
                onClick={handleCopy}
                style={{ border: '2px solid var(--main-bg-theme)' }}
                className="ml-4 px-3 py-1 text-sm font-medium rounded-3xl border-gray-100 transition"
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default CopyBox;
