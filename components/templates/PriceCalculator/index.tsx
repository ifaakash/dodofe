'use client'
import React, { useState } from 'react';
import Slider from 'components/molecules/Slider';
import Button from 'components/atoms/Button';
import Modal from 'components/molecules/Modal';

const PriceCalculator: React.FC = () => {
    const [followers, setFollowers] = useState(1000);
    const [engagement, setEngagement] = useState(0);
    const [niche, setNiche] = useState('Fashion');
    const [showEngagementModal, setShowEngagementModal] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);

    const nicheMultipliers = {
        Fashion: 1.5,
        Beauty: 1.3,
        Fitness: 1.4,
        Tech: 1.2,
        Travel: 1.25,
        Food: 1.1,
        Finance: 1.6,
        Education: 1.3,
        Others: 1,
    };

    const calculatePrice = () => {
        const basePrice = followers * 0.05;
        const engagementBonus = engagement * 20;
        const nicheMultiplier = nicheMultipliers[niche] || 1;
        return (basePrice + engagementBonus) * nicheMultiplier;
    };

    return (
        <div className="price-calculator">
            <h1>Instagram Price Estimator</h1>
            <p>calculate your instagram price</p>

            <div>
                <h2>Total followers</h2>

                <p>{followers.toLocaleString()}</p>
            </div>

            <div>
                <h2>Engagement</h2>

                <p>{engagement.toFixed(1)}%</p>
                <a href="#" onClick={() => setShowEngagementModal(true)}>Calculate engagement</a>
            </div>

            <div>
                <h2>Select your Content niche</h2>
                <select
                    value={niche}
                    onChange={(event) => setNiche(event.target.value)}
                >
                    {Object.keys(nicheMultipliers).map((nicheOption) => (
                        <option key={nicheOption} value={nicheOption}>
                            {nicheOption}
                        </option>
                    ))}
                </select>
            </div>

            <Button text="Calculate now" onClick={() => setShowPriceModal(true)} />

            {showEngagementModal && (
                <Modal onClose={() => setShowEngagementModal(false)}>
                    <h2>Calculate Engagement</h2>
                    {/* Add input fields for likes and comments, and calculate engagement */}
                </Modal>
            )}

            {showPriceModal && (
                <Modal onClose={() => setShowPriceModal(false)}>
                    <h2>Your Estimated Price</h2>
                    <p>Base Price: {followers * 0.05}</p>
                    <p>Engagement Bonus: {engagement * 20}</p>
                    <p>Niche Multiplier: {nicheMultipliers[niche]}</p>
                    <h3>Final Price: {calculatePrice().toFixed(2)}</h3>
                </Modal>
            )}
        </div>
    );
};

export default PriceCalculator;
