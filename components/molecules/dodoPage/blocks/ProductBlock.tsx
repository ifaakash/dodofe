import React from "react";
import Image from "next/image";
import DragIcon from "public/icons/drag.svg";
import { useSortable } from "@dnd-kit/sortable";

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
    if (block.isNew) {
      if (block?.blockData?.productImage?.name) {
        const url = URL.createObjectURL(block.blockData.productImage);
        return url;
      }
      return null;
    } else {
      return block.blockData.productImage;
    }
  };

  console.log("Product Block", block);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex flex-col items-center space-y-3">
        {block.blockData.productImage && (
          <div className="relative w-full h-[130px]">
            <Image
              src={displayImage()}
              fill
              alt={block.blockData?.title}
              className="rounded-lg object-cover"
            />
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
          <span className="text-gray-800 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {block.blockData?.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
