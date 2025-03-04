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
import cx from "classnames";

type Value = Date | null;

const InvoiceDueDate = ({ handleInvoiceSubmit }: any) => {

  const dispatch = useDispatch();
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Value>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const state = useSelector((state: any) => state.invoice);

  // Set default dates when component mounts
  useEffect(() => {
    // Set today's date as invoice date
    const today = new Date();
    setInvoiceDate(today);
    dispatch(addDate(today.toISOString()));

    // Set due date as today + 7 days
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 7);
    setDueDate(defaultDueDate);
    dispatch(addDueDate(defaultDueDate.toISOString()));
  }, [dispatch]);

  const handleDateChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value instanceof Date) {
      setDueDate(value);
      const dateStr = value.toISOString();
      dispatch(addDueDate(dateStr));
      setShowCalendar(false);
    }
  };

  // Format date to display in MM/DD/YY format
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return "Select Date";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${month}/${day}/${year}`;
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
          <div className="text-[#414D55] font-semibold">
            {formatDisplayDate(invoiceDate)}
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
            {dueDate ? formatDisplayDate(dueDate) : "Select Date"}
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

      <div
        className={cx(
          "bottom-0 py-4 fixed justify-center w-[90%] bg-white/20 rounded-xl"
        )}
      >
        <NewButton
          size="large"
          variant={disableNextButton ? "disabled" : "primary"}
          onClick={handleInvoiceSubmit}
          className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-xl"
        >
          Review and Share
        </NewButton>
      </div>
    </div>
  );
};

export default InvoiceDueDate;