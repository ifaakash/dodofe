// Card.js
import React from 'react';
import cx from 'classnames';

export const Card = ({ children, className, ...props }: any) => {
    return (
        <div
            className={cx(
                'p-4 bg-white rounded-xl shadow-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
