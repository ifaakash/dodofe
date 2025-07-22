import NewButton from '@components/atoms/Button/NewButton';
import { MoveUpRight } from 'lucide-react';
import React from 'react';

interface CTABannerProps {
    titleHtml: string;
    highlightedTitle: string;
    description: string;
    ctaText: string;
    onCtaClick?: () => void;
    maxWidth?: number;
}

const CTABanner: React.FC<CTABannerProps> = ({
    titleHtml,
    highlightedTitle,
    description,
    ctaText,
    onCtaClick,
    maxWidth
}) => {

    const highlightTextInTitle = (fullTitle: string, highlightedText: string): string => {
        if (!highlightedText || !fullTitle.includes(highlightedText)) {
            return `<span class="text-black">${fullTitle}</span>`;
        }

        const parts = fullTitle.split(highlightedText);
        let result = '';

        for (let i = 0; i < parts.length; i++) {
            if (parts[i]) {
                result += `<span class="text-black text-2xl font-bold">${parts[i]}</span></br>`;
            }

            if (i < parts.length - 1) {
                result += `<span class="bg-gradient-to-r  from-[#EE2A7B] to-[#6228D7] bg-clip-text text-transparent leading-none text-2xl font-bold">${highlightedText}</span>`;
            }
        }

        return result;
    };

    const processedTitleHtml = highlightTextInTitle(titleHtml, highlightedTitle);

    return (
        <div>
            <div className='flex justify-between items-center flex-col gap-4'>
                <div className='flex flex-col gap-[7px] items-center'>
                    <div className={`max-w-[${maxWidth}px]`} dangerouslySetInnerHTML={{ __html: processedTitleHtml }} />

                    <p style={{ fontSize: '14px', margin: '0px 24px', fontWeight: '400' }}>
                        {description}
                    </p>
                </div>

                <button className='border-[1px] border-[#14B355] bg-brandPrimary text-white rounded-full px-4 py-2 flex items-center gap-2 font-medium' onClick={onCtaClick}>
                    {ctaText}
                    <MoveUpRight />
                </button>
            </div>
        </div>
    );
};

export default CTABanner;