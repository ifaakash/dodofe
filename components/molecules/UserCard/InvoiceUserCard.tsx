import React from "react";
import Image from "next/image";
import RajveerBhaiya from "public/assets/rajveer.png";
import { InvoiceUserCardProps } from "types";

const InvoiceUserCard: React.FC<InvoiceUserCardProps> = ({ detail, userID, setUserID }) => {
  const isSelected = userID === detail?._id;

  return (
    <div
      className={`p-4 rounded-xl bg-white flex flex-col gap-3 cursor-pointer border ${
        isSelected ? "border-[#5E6C84]" : "border-transparent"
      }`}
      onClick={() => detail?._id && setUserID(detail._id)}
      aria-label={`Select client ${detail?.name || "unknown"}`}
    >
      <div className="flex justify-between items-center">
        <Image
          src={detail?.logo || RajveerBhaiya}
          width={40}
          height={40}
          className="rounded-full"
          alt={`${detail?.name || 'Unknown'}'s profile`}
        />
        <input
          type="radio"
          name="selectedClient"
          checked={isSelected}
          onChange={() => detail?._id && setUserID(detail._id)}
          className="cursor-pointer"
          aria-label={`Radio button for ${detail?.name || "unknown"}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[#414D55] font-semibold">{detail?.name || "N/A"}</div>
        <div className="flex flex-col gap-1">
          <div className="text-sm text-[#5E6C84] font-medium">
            {detail?.email || "Email not provided"}
          </div>
          <div className="text-sm text-[#5E6C84] font-medium">
            {detail?.address || "Address not provided"}
          </div>
          <div className="text-sm text-[#5E6C84] font-medium">
            {detail?.city || "City not provided"}, {detail?.state || "State not provided"}{" "}
            {detail?.zipcode ? `- ${detail?.zipcode}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUserCard;