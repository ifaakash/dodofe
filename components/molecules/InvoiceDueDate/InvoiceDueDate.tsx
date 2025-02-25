'use client'
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import CalendarSVG from "public/icons/calendar.svg";
import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from "react-redux";
import { addDueDate, addDate } from "store/slice/invoiceSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import NewButton from "@components/atoms/Button/NewButton";

type Value = Date | null;

const InvoiceDueDate = ({ handleInvoiceSubmit }: any) => {
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const state = useSelector((state: any) => state.invoice);

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    if (value instanceof Date) {
      setDueDate(value);
      const dateStr = value.toISOString();
      dispatch(addDueDate(dateStr));
      setShowCalendar(false);
    }
  };

  return (
    <div className="py-4 px-5 flex flex-col gap-1">
      {/* Invoice Info Section */}
      <div className="p-4 rounded-lg bg-white flex justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-[#414D55] font-semibold">#1323</div>
          <div className="text-xs text-[#5E6C84]">Invoice number</div>
        </div>
        <div className="flex flex-col gap-1 relative">
          <div className="text-[#414D55] font-semibold">10/10/24</div>
          <div className="text-xs text-[#5E6C84]">Invoice date</div>
        </div>
        {showCalendar && (
          <div className="absolute z-10 bg-white shadow-lg rounded-lg p-2">
            <Calendar
              //@ts-ignore : Calender band nhi hoga idk why correct way se, ig library problem
              onChange={handleDateChange}
              value={state.dueDate ? new Date(state.dueDate) : new Date()}
              minDate={new Date()}
              className="react-calendar"
            />
          </div>
        )}
      </div>

      <div
        className="p-[14px] rounded-lg bg-white flex justify-between items-center cursor-pointer"
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        <div className="text-sm text-[#8994A9]">Due Date</div>
        <div className="flex items-center gap-[6px]">
          <div className="font-semibold text-[#414D55]">
            {dueDate ? dueDate.toLocaleDateString() : "Select Date"}
          </div>
          <Image src={CalendarSVG} alt="calendar" width={20} />
        </div>
      </div>

      <div className="bottom-0 py-4 fixed" style={{ width: '90%' }}>
        <NewButton
          size="large"
          variant="primary"
          disabled={disableNextButton}
          onClick={handleInvoiceSubmit}
        >
          Review and Share
        </NewButton>
      </div>
    </div >
  );
};

export default InvoiceDueDate;