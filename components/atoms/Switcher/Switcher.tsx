import React from "react";
import { toast } from "react-toastify";

const Switcher = ({ uploadedImage, displayType, setDisplayType }: { uploadedImage: any; displayType: string; setDisplayType: (type: string) => void }) => {

  const checkForImage = () => {
    if (uploadedImage) {
      return true;
    }

    toast.info("Please upload an image before switching to large view");
    return false;
  };

  return (
    <div className="flex bg-[#3D4966] rounded-lg p-1">
      <button
        onClick={() => { if (checkForImage()) { setDisplayType("SMALL") } }}
        className={`p-2 rounded transition-colors ${displayType === "SMALL" ? "bg-[#FDFBFF]" : "bg-[#3D4966]"
          }`}
      >
        <div
          className={`w-5 border-[1px] h-[5px] ${displayType === "SMALL" ? "bg-[#3D4966]" : "bg-[#FDFBFF]"
            } rounded-[3px]`}
        />
      </button>
      <button
        onClick={() => { if (checkForImage()) { setDisplayType("LARGE") } }}
        className={`p-2 rounded transition-colors ${displayType === "LARGE" ? "bg-[#FDFBFF]" : "bg-[#3D4966]"
          }`}
      >
        <div
          className={`w-5 border-[1px] h-3 ${displayType === "LARGE" ? "bg-[#3D4966]" : "bg-[#FDFBFF]"
            } rounded-[3px]`}
        />
      </button>
    </div>
  );
};

export default Switcher;
