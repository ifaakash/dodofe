import React from "react";

const Switcher = ({ displayType, setDisplayType }: { displayType: string; setDisplayType: (type: string) => void }) => {
  return (
    <div className="flex bg-[#3D4966] rounded-lg p-1">
      <button
        onClick={() => setDisplayType("SMALL")}
        className={`p-2 rounded transition-colors ${
          displayType === "SMALL" ? "bg-[#FDFBFF]" : "bg-[#3D4966]"
        }`}
      >
        <div
          className={`w-5 border-[1px] h-[5px] ${
            displayType === "SMALL" ? "bg-[#3D4966]" : "bg-[#FDFBFF]"
          } rounded-[3px]`}
        />
      </button>
      <button
        onClick={() => setDisplayType("LARGE")}
        className={`p-2 rounded transition-colors ${
          displayType === "LARGE" ? "bg-[#FDFBFF]" : "bg-[#3D4966]"
        }`}
      >
        <div
          className={`w-5 border-[1px] h-3 ${
            displayType === "LARGE" ? "bg-[#3D4966]" : "bg-[#FDFBFF]"
          } rounded-[3px]`}
        />
      </button>
    </div>
  );
};

export default Switcher;
