import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";

// dot-line, solid-line, or
const SeparatorBlock = ({type, mode = "public"}: {type: string, mode: string}) => {
  const separator = type;
  return (
    <div className={`  p-2  ${mode === "edit" ? "bg-white rounded-xl gap-2 py-2 flex items-center" : ""}`}>
      {mode === "edit" && <Image src={DragIcon} alt="drag" />}
      <div className="w-full">
        {separator === "dashed-line" && (
          <div>
            <div className="w-full h-[1px] border-b-2 border-dashed border-black"></div>
            <div className="w-full h-[1px] border-b-2 border-dashed border-black"></div>
          </div>
        )}
        {separator === "or" && (
          <div className="flex items-center gap-2">
            <div className="w-full h-[1px] bg-black" />
            <div> OR </div>
            <div className="w-full h-[1px] bg-black" />
          </div>
        )}
        {separator === "solid-line" && (
          <div className="w-full h-[1px] border-b-2 border-solid border-black"></div>
        )}
      </div>
    </div>
  );
};

export default SeparatorBlock;
