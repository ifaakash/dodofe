import React, { useState } from 'react';

interface CopyBoxProps {
    text: string;
}

const CopyBox: React.FC<CopyBoxProps> = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e) => {
        e?.stopPropagation();
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="flex justify-between items-center bg-white py-2 px-2 rounded-3xl w-full">
            <button
                onClick={handleCopy}
                style={{ border: '2px solid var(--main-bg-theme)', width: '80px' }}
                className="ml-2 px-3 py-1 text-sm font-medium rounded-3xl border-gray-100 transition"
            >
                {isCopied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default CopyBox;
