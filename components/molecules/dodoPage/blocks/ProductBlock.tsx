"use client"
import React from "react";
import Image from "next/image";
import DragIcon from "public/icons/drag.svg";
import { useSortable } from "@dnd-kit/sortable";
import DodoIcon from "public/icons/dodoIconName.svg";
import { isEmpty } from "@utils/index";

interface ProductBlockProps {
  block: any;
  mode: string;
}

const ProductBlock: React.FC<ProductBlockProps> = ({ block, mode }) => {
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
    if (block.isNew || block.isUpdated) {
      if (block?.blockData?.productImage instanceof Blob) {
        const url = URL.createObjectURL(block.blockData.productImage);
        console.log({ url }, 1)
        return url;
      }

      if (!block.blockData.productImage) {
        return null;
      }

      return block.blockData.productImage;
    } else {
      if (!block.blockData.productImage) {
        return null;
      }

      return block.blockData.productImage;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 max-w-[181px]`}
    >
      <div className="flex flex-col items-center space-y-3">
        {block.blockData.productImage && (
          <div className="relative w-full aspect-[3/4]">
            {!isEmpty(displayImage()) ? (
              <Image
                src={displayImage() || DodoIcon}
                fill
                alt={block.blockData?.title || "Product image"}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-[130px] bg-gray-200 rounded-lg"></div>
            )}
          </div>
        )}

        <div className="font-semibold flex items-center w-full gap-2">
          {mode === "edit" && (
            <Image
              src={DragIcon}
              {...listeners}
              alt="Drag handle"
              width={20}
              height={20}
            />
          )}
          <span className="text-gray-800 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] text-sm">
            {block.blockData?.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
