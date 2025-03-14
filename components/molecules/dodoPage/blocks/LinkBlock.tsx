"use client"
import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { BADGE_COLORS_MAP } from "utils/constants";
import { isEmpty } from "@utils/index";

const LinkBlock = ({ mode, block, inPreview = false }: { mode: string; block: any, inPreview?: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const displayImage = () => {
    if (!isEmpty(block.blockData?.linkDisplayPicture)) {
      if (typeof block.blockData?.linkDisplayPicture === "string") {
        return block.blockData.linkDisplayPicture;
      }
      return URL.createObjectURL(block.blockData.linkDisplayPicture);
    }
    return null;
  };

  return (
    <div
      className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
      ref={setNodeRef}
      style={{ ...style, height: block.blockCardSize === "SMALL" ? '66px' : '180px' }}
      {...attributes}
    >
      {block.blockCardSize === "SMALL" ? (
        <div className="flex gap-2">
          {mode === "edit" && !inPreview && (
            <Image
              src={DragIcon}
              alt="Drag handle"
              width={20}
              height={20}
              {...listeners}
            />
          )}
          {displayImage() && (
            <img
              src={displayImage()}
              alt="Link"
              className="w-[50px] h-[50px] object-cover rounded-lg"
            />
          )}
          <div>
            <div className="text-base font-semibold text-[#3D4966] mb-1">
              {block.blockData?.title}
            </div>
            {block.blockData?.badge && (
              <div
                className="px-3 py-1 text-xs font-medium flex items-center w-fit"
                style={{
                  backgroundColor: BADGE_COLORS_MAP[block.blockData.badge.backgroundColor],
                  color: block.blockData.badge.color,
                  height: '18px',
                  borderRadius: '40px'
                }}
              >
                {block.blockData.badge.text}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {block.blockData?.linkDisplayPicture && (
            <img
              src={displayImage()}
              alt="Link"
              className="w-full h-[130px] object-cover rounded-lg"
            />
          )}

          <div className="flex gap-2 justify-between">
            <div className="flex items-center gap-2">
              {mode === "edit" && !inPreview && (
                <Image
                  src={DragIcon}
                  alt="Drag handle"
                  width={20}
                  height={20}
                  {...listeners}
                />
              )}
              <div>{block.blockData?.title}</div>
            </div>

            {block.blockData?.badge && (
              <div
                className="px-2 py-1 rounded-lg text-xs font-medium flex items-center w-fit"
                style={{
                  backgroundColor: BADGE_COLORS_MAP[block.blockData.badge.backgroundColor],
                  color: block.blockData.badge.color,
                }}
              >
                {block.blockData.badge.text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkBlock;
