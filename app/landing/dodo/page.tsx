"use client";
import React from 'react';
import cx from 'classnames';

import Landing from '@components/templates/Landing';

export const LandingPage = ({ children, className, ...props }: any) => {
    return (
        <div
            className={
                cx(
                    'p-4 bg-white rounded-xl shadow-md',
                    className
                )
            }
            {...props}
        >
            <Landing />

            {children}
        </div>
    );
};

export default LandingPage;
