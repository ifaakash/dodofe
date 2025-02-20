import React from "react";
import Image from "next/image";
import DragIcon from "public/icons/drag.svg";
import { useSortable } from "@dnd-kit/sortable";

interface ProductBlockProps {
  productData: any;
  mode: string;
  id?: string;
}

const ProductBlock: React.FC<ProductBlockProps> = ({
  productData,
  mode,
  id,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id || '' });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-full aspect-video">
          <Image
            src={productData?.productImage}
            alt={productData?.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div
          className="font-semibold flex items-center w-full gap-2"
          
        >
          {mode === "edit" && (
            <Image src={DragIcon} {...listeners} alt="Drag handle" width={20} height={20} />
          )}
          <span className="text-gray-800 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
            {productData?.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBlock;
