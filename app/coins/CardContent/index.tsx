// CardContent.js
import React from 'react';

export const CardContent = ({ children, className }: any) => {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
};

export default CardContent;
