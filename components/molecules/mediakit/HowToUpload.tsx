import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Step1 from 'public/images/ExportStep1.png'
import Step2 from 'public/images/ExportStep2.png'
import Step3 from 'public/images/ExportStep3.png'
import Image from 'next/image';
import NewButton from '@components/atoms/Button/NewButton';


interface HowToUploadProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    step1: string;
    step2: string;
    step3: string;
}

const HowToUpload = ({ isOpen, onClose, title, step1, step2, step3 }: HowToUploadProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop with blur effect */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Content */}
            <div
                ref={modalRef}
                className={`relative w-full bg-white rounded-t-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ maxHeight: '85vh' }}
            >
                {/* Drawer Handle */}
                <div className="w-full flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Fixed Header */}
                <div className="sticky top-0 bg-white px-6 pb-4 border-b">
                    <div className="flex justify-between items-start">
                        <div className='flex flex-col'>
                            <div className="text-xl font-bold">How to Upload</div>
                            <div className='text-[#F25A99] text-xl font-bold leading-none'> {title} </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-6 py-4 flex-1">
                    <div className="space-y-4">
                        <Image src={step1} alt="Step 1" className="w-full" />
                        <Image src={step2} alt="Step 2" className="w-full" />
                        <Image src={step3} alt="Step 3" className="w-full" />
                    </div>
                </div>

                {/* Fixed Bottom Button */}
                <div className="sticky bottom-0 bg-white px-6 py-4 border-t">
                    <NewButton variant='primary' size='large' onClick={onClose} className="w-full">
                        Okay
                    </NewButton>
                </div>
            </div>
        </div>
    );
};

export default HowToUpload;