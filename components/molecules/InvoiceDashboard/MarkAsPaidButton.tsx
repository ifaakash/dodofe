import React, { useState } from "react";
import { ChevronsRight, Check } from "lucide-react";

const MarkAsPaidButton = () => {
    const [isPaid, setIsPaid] = useState(false);

    const onMarkAsPaid = () => {
        setIsPaid(true);
    };

    return (
        <button
            onClick={onMarkAsPaid}
            disabled={isPaid}
            className={`flex items-center bg-[#EAE9EC] w-full rounded-full gap-[10px] hover:bg-[#dedde0] transition-colors ${isPaid ? "cursor-default" : "cursor-pointer"
                }`}
            aria-label="Mark invoice as paid"
        >
            <div
                className={`bg-brandPrimary p-[6px] rounded-full min-h-10 min-w-10 flex justify-center items-center transition-transform duration-500 ${isPaid ? "translate-x-[200px] bg-green-500" : "translate-x-0"
                    }`}
            >
                {isPaid ? (
                    <Check size={24} className="text-white" />
                ) : (
                    <ChevronsRight size={24} className="text-white" />
                )}
            </div>
            <span
                className={`text-[#414D55] text-xs font-medium transition-opacity duration-300 ${isPaid ? "opacity-0" : "opacity-100"
                    }`}
            >
                Mark as Paid
            </span>
            {isPaid && (
                <span className="text-green-500 text-xs font-medium transition-opacity duration-500">
                    Paid
                </span>
            )}
        </button>
    );
};

export default MarkAsPaidButton;
