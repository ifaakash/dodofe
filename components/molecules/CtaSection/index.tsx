import React from 'react';
import PropTypes from 'prop-types';
import styles from './ctaSection.module.css'; // Optional CSS for styling

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cx from "classnames";
import Image from 'next/image';

import gotoIcon from 'public/icons/gotoIcon.svg';
import profileIcon from 'public/assets/userProfile.png';
import { isEmpty } from '@utils/index';

const CtaSection = ({
    title = 'DodoPage',
    description = 'Create dynamic links in your bio that stands out',
    buttonLabel = 'Create now',
    onClick = () => { },
    onButtonClick = () => { },
    onImageClick = () => { },
    img = profileIcon,
    imgSize = -1,
    floatingPosition = 'bottom-right', // 'top-right' or 'bottom-right'
    bgColor = '#fff',
    textColor = '#000',
    buttonBgColor = '#00c853',
    buttonTextColor = '#fff',
}) => {

    if (!title) {
        return (
            <div className={styles.floatingSection} style={{ color: '#000' }}>
                <div className={styles.firstPart} style={{ backgroundColor: bgColor }}>
                    <Skeleton height={28} width={'60%'} style={{ borderRadius: '8px' }} />
                    <Skeleton height={18} width={'50%'} style={{ borderRadius: '8px' }} />
                </div>
                <div className={styles.secondThirdContainer}>
                    <div
                        className={cx(styles.floatingSectionButton, styles.secondPart, floatingPosition === 'top-right' ? styles.topRight : styles.bottomRight)}
                        style={{ minHeight: '38px', maxHeight: '100px' }}
                    >
                        <Skeleton height={38} width={128} borderRadius={12} />
                    </div>
                    <div className={styles.curvedTriangle} style={{ backgroundColor: bgColor }}></div>
                    <div className={styles.thirdPart} style={{ backgroundColor: bgColor }}>
                        <Skeleton circle height={32} width={32} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.floatingSection} style={{ color: textColor }} onClick={onClick}>
            <div className={styles.firstPart} style={{ backgroundColor: bgColor }}>
                <h1 className='text-2xl font-bold mb-2'>{title}</h1>
                <p className='text-lg font-thin'>{description}</p>
            </div>
            <div className={styles.secondThirdContainer}>
                <div className={cx(styles.floatingSectionButton, styles.secondPart, floatingPosition === 'top-right' ? styles.topRight : styles.bottomRight)}
                    style={{ backgroundColor: buttonBgColor, color: buttonTextColor, minHeight: '38px', maxHeight: '40px' }}
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
                            height={imgSize > 0 ? imgSize : 84}
                            width={imgSize > 0 ? imgSize : 84}
                            src={img}
                            alt="user"
                            className="mb-2 mt-2"
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