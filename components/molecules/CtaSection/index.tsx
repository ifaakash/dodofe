import React from 'react';
import PropTypes from 'prop-types';
import styles from './ctaSection.module.css'; // Optional CSS for styling
import cx from "classnames";
import Image from 'next/image';

import gotoIcon from 'public/icons/gotoIcon.svg';
import profileIcon from 'public/assets/userProfile.png';

const CtaSection = ({
    title = 'DodoPage',
    description = 'Create dynamic links in your bio that stands out',
    buttonLabel = 'Create now',
    onButtonClick = () => { },
    onImageClick = () => { },
    img = profileIcon,
    floatingPosition = 'bottom-right', // 'top-right' or 'bottom-right'
    bgColor = '#fff',
    textColor = '#000',
    buttonBgColor = '#00c853',
    buttonTextColor = '#fff',
}) => {
    return (
        <div className={styles.floatingSection} style={{ color: textColor }}>
            <div className={styles.firstPart} style={{ backgroundColor: bgColor }}>
                <h1 className='text-2xl font-bold mb-2'>{title}</h1>
                <p className='text-lg font-thin'>{description}</p>
            </div>
            <div className={styles.secondThirdContainer}>
                <div className={cx(styles.floatingSectionButton, styles.secondPart, floatingPosition === 'top-right' ? styles.topRight : styles.bottomRight)}
                    style={{ backgroundColor: buttonBgColor, color: buttonTextColor, minHeight: '38px' }}
                    onClick={onButtonClick}
                >
                    <span className='text-xs font-normal'>{buttonLabel}</span>

                    {buttonLabel !== 'Coming soon...' &&
                        <Image
                            height={12}
                            width={12}
                            src={gotoIcon}
                            alt="user"
                            className="ml-2"
                        />
                    }
                </div>
                <div className={styles.curvedTriangle} style={{ backgroundColor: bgColor }}></div>

                <div className={styles.thirdPart} style={{ backgroundColor: bgColor }}>
                    <div onClick={onImageClick}>
                        <Image
                            height={54}
                            width={54}
                            src={img}
                            alt="user"
                            className="mb-4 mt-4"
                        />
                    </div>
                </div>
            </div>
        </div >
    );
};

CtaSection.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    floatingPosition: PropTypes.oneOf(['top-right', 'bottom-right']),
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    buttonBgColor: PropTypes.string,
    buttonTextColor: PropTypes.string,
};

export default CtaSection;