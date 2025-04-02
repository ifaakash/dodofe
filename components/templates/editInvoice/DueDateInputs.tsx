'use client'
import React, { useEffect, useState } from 'react'
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { useDispatch } from 'react-redux';
import CalendarSVG from "public/icons/calendar.svg";
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { updateDueDate } from 'store/slice/editInvoiceSlice';


const DueDateInputs = ({ dueDate, invoiceDate, invoiceNumber }: any) => {

    const dispatch = useDispatch();
    const [showCalendar, setShowCalendar] = useState(false);
    const [disableNextButton, setDisableNextButton] = useState(false);

    const formatDisplayDate = (date: Date | null) => {
        if (!date) return "Select Date";
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear()).slice(2);
        return `${month}/${day}/${year}`;
    };

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) {
            // Set time to start of day in IST (5:30 hours ahead of UTC)
            const date = new Date(value);
            date.setHours(5, 30, 0, 0);
            const isoDate = date.toISOString();
            dispatch(updateDueDate(isoDate));
        }
        setShowCalendar(false);
    };

    const formatInvoiceNumber = (num: number | string) => {
        return String(num).padStart(3, '0');
    };

    return (
        <div className='px-5'>
            <div className="p-4 rounded-lg bg-white flex justify-between">
                <div className="flex flex-col gap-1">
                    <div className="text-[#414D55] font-semibold">#{formatInvoiceNumber(invoiceNumber)}</div>
                    <div className="text-xs text-[#5E6C84]">Invoice number</div>
                </div>
                <div className="flex flex-col gap-1 relative">
                    <div className="text-[#414D55] font-semibold">
                        {formatDisplayDate(new Date(invoiceDate))}
                    </div>
                    <div className="text-xs text-[#5E6C84]">Invoice date</div>
                </div>
            </div>

            <div
                className="p-[14px] rounded-lg bg-white flex justify-between items-center cursor-pointer"
                onClick={() => setShowCalendar((prev) => !prev)}
            >
                <div className="text-sm text-[#8994A9]">Due Date</div>
                <div className="flex items-center gap-[6px]">
                    <div className="font-semibold text-[#414D55]">
                        {dueDate ? formatDisplayDate(new Date(dueDate)) : "Select Date"}
                    </div>
                    <Image src={CalendarSVG} alt="calendar" width={20} />
                </div>
            </div>

            {showCalendar && (
                <div className="absolute z-10 bg-white shadow-lg rounded-lg p-2">
                    <Calendar
                        onChange={handleDateChange}
                        value={dueDate}
                        minDate={new Date()}
                        className="react-calendar"
                    />
                </div>
            )}
        </div>
    )
}

export default DueDateInputs