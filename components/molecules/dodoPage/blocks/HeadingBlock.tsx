import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";

const HeadingBlock = ({
  title,
  mode = "public",
}: {
  title: string;
  mode: string;
}) => {
  const heading = title;

  return (
    <div
      className={`p-2  ${
        mode === "edit"
          ? "bg-white rounded-xl flex items-center gap-2"
          : ""
      }`}
    >
      {mode === "edit" && <Image src={DragIcon} alt="poll" />}
      <div className="font-bold text-[#3D4966]">{heading}</div>
    </div>
  );
};

export default HeadingBlock;
