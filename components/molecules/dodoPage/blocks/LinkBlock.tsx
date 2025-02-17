import React from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

const LinkBlock = ({
  mode,
  blockData,
  blockCardSize,
  id,
}: {
  mode: string;
  blockData: any;
  blockCardSize: string;
  id?: string;
}) => {
  const PLACEHOLDER_IMAGE = "https://picsum.photos/200";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };


  return (
    <div
      className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      {blockCardSize === "SMALL" ? (
        <div className="flex gap-2">
          {mode === "edit" && (
            <Image
              src={DragIcon}
              alt="Drag handle"
              width={20}
              height={20}
              {...listeners}
            />
          )}
          <img
            src={PLACEHOLDER_IMAGE}
            alt="Link"
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
          <div>
            <div className="text-sm font-medium text-[#3D4966]">
              {blockData?.title}
            </div>
            {blockData?.badge && (
              <div
                className="px-2 py-1 rounded-lg text-xs font-medium flex items-center"
                style={{
                  backgroundColor: blockData.badge.backgroundColor,
                  color: blockData.badge.color,
                }}
              >
                {blockData.badge.text}
              </div>
            )}
          </div>
        </div>
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
                <Image
                  src={DragIcon}
                  alt="Drag handle"
                  width={20}
                  height={20}
                  {...listeners}
                />
              )}
              <div>{blockData?.title}</div>
            </div>

            {blockData?.badge && (
              <div
                className="px-2 py-1 rounded-lg text-xs font-medium flex items-center"
                style={{
                  backgroundColor: blockData.badge.backgroundColor,
                  color: blockData.badge.color,
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
