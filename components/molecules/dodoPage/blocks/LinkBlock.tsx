import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";

const LinkBlock = ({
  mode,
  blockData,
  blockCardSize,
}: {
  mode: string;
  blockData: any;
  blockCardSize: string;
}) => {

  const PLACEHOLDER_IMAGE = "https://picsum.photos/200";

  return (
    <div className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      {blockCardSize === "SMALL" ? (
        <div>SMALL</div>
      ) : (
        <div className="flex flex-col gap-2">
          <img
            src={PLACEHOLDER_IMAGE}
            alt="Link"
            className="w-full h-[130px] object-cover rounded-lg"
          />

          <div className="flex gap-2 justify-between">
            <div className="flex items-center gap-2">
             {mode === "edit" && (
              <Image src={DragIcon} alt="Drag handle" width={20} height={20} />
             )}
              <div>{blockData?.title}</div>
            </div>

            {blockData?.badge && (
              <div
                className="px-2 py-1 rounded-lg text-xs font-medium flex items-center"
                style={{
                  backgroundColor: blockData.badge.backgroundColor,
                  color: blockData.badge.color
                }}
              >
                {blockData.badge.text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkBlock;
