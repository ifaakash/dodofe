import React, { useRef, useEffect, useState } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
};

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);

    const totalSteps = Math.floor((max - min) / step);
    const values = Array.from({ length: totalSteps + 1 }, (_, i) => min + i * step);

    const lineWidth = 6;
    const lineGap = 10;
    const totalWidth = values.length * (lineWidth + lineGap);

    // Scroll to selected value when mounted or value changes
    useEffect(() => {
        const container = trackRef.current;
        if (container) {
            const index = (value - min) / step;
            const lineX = index * (lineWidth + lineGap);
            const centerOffset = container.offsetWidth / 2 - lineWidth / 2;
            container.scrollTo({
                left: lineX - centerOffset,
                behavior: 'smooth',
            });
        }
    }, [value]);

    const handleScroll = () => {
        const container = trackRef.current;
        if (!container) return;

        const center = container.scrollLeft + container.offsetWidth / 2;
        const index = Math.round(center / (lineWidth + lineGap));
        const newValue = min + index * step;
        if (newValue !== value) {
            onChange(newValue);
        }
    };

    const getLineHeight = (index: number) => {
        const centerIndex = Math.floor(values.length / 2);
        const distance = Math.abs(index - centerIndex);
        const maxHeight = 32;
        const minHeight = 10;
        const falloff = 1.8; // higher = faster dropoff
        return `${Math.max(minHeight, maxHeight - distance * falloff)}px`;
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.pointer} />
            <div
                className={styles.track}
                ref={trackRef}
                onScroll={handleScroll}
            >
                {values.map((val, index) => (
                    <div
                        key={val}
                        className={styles.line}
                        style={{
                            height: getLineHeight(index),
                            width: `${lineWidth}px`,
                            marginRight: `${lineGap}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
