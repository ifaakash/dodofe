import React, { useState, useRef, useEffect } from "react";
import { ChevronsRight, Check, ChevronsLeft } from "lucide-react";
import { toggleInvoicePaymentStatus } from "../../../api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { toast } from "react-toastify";
import Confetti from 'react-confetti';


const MarkAsPaidButton = ({ invoice, isPaymentStatusChanged, setIsPaymentStatusChanged }: { invoice: any, isPaymentStatusChanged: boolean, setIsPaymentStatusChanged: (value: boolean) => void }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef(null);
  const knobRef = useRef(null);
  const maxPosition = useRef(0);
  const startX = useRef(0);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const confettiRef = React.useRef(null);

  useEffect(() => {
    if (confettiRef.current) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, [isConfettiActive])

  useEffect(() => {
    setIsPaid(invoice.status === "paid");
    // Set initial position based on paid status
    setPosition(invoice.status === "paid" ? maxPosition.current : 0);
  }, [invoice]);

  useEffect(() => {
    if (buttonRef.current && knobRef.current) {
      maxPosition.current =
        buttonRef.current.offsetWidth - knobRef.current.offsetWidth;
      // Update position if paid status changes
      if (isPaid) {
        setPosition(maxPosition.current);
      } else {
        setPosition(0);
      }
    }
  }, [isPaid]);

  const handleSwipeComplete = () => {
    // Determine if we should mark as paid or unpaid based on position
    if (position >= maxPosition.current * 0.6) {
      setPosition(maxPosition.current);
      if (!isPaid) {
        setIsPaid(true);

        handleMarkAsPaid();
      }
    } else {
      setPosition(0);
      if (isPaid) {
        setIsPaid(false);
        handleMarkAsUnpaid();
      }
    }
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    setIsDragging(true);

    if (document) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    const newPosition = Math.max(
      0,
      Math.min(maxPosition.current, position + diff)
    );
    startX.current = currentX;
    setPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    const newPosition = Math.max(
      0,
      Math.min(maxPosition.current, position + diff)
    );
    startX.current = currentX;
    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleSwipeComplete();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    handleSwipeComplete();

    if (document) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMarkAsPaid = async () => {
    const res = await toggleInvoicePaymentStatus({
      invoiceId: invoice.id,
      userId: userId,
      paymentStatus: "paid",
    });
    if (res.success) {
      console.log("res", res);
      setIsConfettiActive(true);
      setIsPaymentStatusChanged(true);
      // Stop the confetti after 5 seconds
      setTimeout(() => {
        setIsConfettiActive(false);
      }, 5000);
      setIsPaid(true);
      toast.success("Invoice marked as paid");
    }
  };

  const handleMarkAsUnpaid = async () => {
    const res = await toggleInvoicePaymentStatus({
      invoiceId: invoice.id,
      userId: userId,
      paymentStatus: "unPaid",
    });
    if (res.success) {
      console.log("res", res);
      setIsPaymentStatusChanged(true);
      setIsPaid(false);
      toast.success("Invoice marked as unpaid");
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      {isConfettiActive && <Confetti ref={confettiRef} width={dimensions.width} height={dimensions.height} numberOfPieces={100} initialVelocityY={10} />}
      <div
        ref={buttonRef}
        className={`relative h-12 rounded-full flex items-center overflow-hidden ${isPaid ? "border-2 border-brandPrimary bg-[#ECFAF2]" : "bg-[#EAE9EC]"
          }`}
      >
        {/* Track with label */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPaid ? <span
            className={`text-gray-500 text-sm font-medium transition-opacity duration-300 ${isPaid ? "opacity-0" : "opacity-100 ml-10 "
              }`}
          >
            Mark as Paid
          </span> :
            <span
              className={`text-green-500 text-sm font-medium transition-opacity duration-300 ${isPaid ? "opacity-100  mr-10" : "opacity-0"
                }`}
            >
              Marked as Paid
            </span>
          }
        </div>

        {/* Swipeable knob */}
        <div
          ref={knobRef}
          className={`absolute p-2 rounded-full bg-brandPrimary h-11 w-11 flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors ${isPaid ? "bg-green-500  -left-1" : ""
            }`}
          style={{
            transform: `translateX(${position}px)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {isPaid ? (
            <ChevronsLeft size={20} className="text-white" />
          ) : (
            <ChevronsRight size={20} className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkAsPaidButton;
